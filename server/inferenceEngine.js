// ============================================================
// KilimoSmart Forward-Chaining Inference Engine
// ISS 3102 Expert Systems — Assignment 3
// ============================================================
// Implements the inference logic described in Assignment 3:
//   1. Load all rules for the selected crop
//   2. Pattern-match rules against the fact set
//   3. Conflict resolution: most conditions matched wins
//   4. Confidence: HIGH (100% match) | MODERATE (75%+) | LOW (60%+)
//   5. Return ranked diagnosis list
// ============================================================

import { RULES, DISEASES } from './knowledgeBase.js'

/**
 * Run the forward-chaining inference engine.
 * @param {string} cropId   - Selected crop (e.g. 'maize')
 * @param {Object} facts    - Farmer's answers: { fact_name: 'value', ... }
 * @returns {Array}         - Ranked array of diagnosis results
 */
export function runInference(cropId, facts) {
  // Step 1: Filter rules to those relevant to this crop
  const cropRules = RULES.filter(r => r.cropId === cropId)

  const results = []

  // Step 2: Pattern matching — evaluate every rule against the fact set
  for (const rule of cropRules) {
    let matchedCount = 0
    const totalConditions = rule.conditions.length
    const matchedFacts = []
    const unmatchedFacts = []

    for (const condition of rule.conditions) {
      const farmerAnswer = facts[condition.fact]
      if (farmerAnswer === condition.value) {
        matchedCount++
        matchedFacts.push(condition.fact)
      } else if (farmerAnswer !== undefined) {
        // Farmer answered but answer didn't match
        unmatchedFacts.push(condition.fact)
      }
      // If farmer hasn't answered this fact yet, it's simply unanswered
    }

    const matchRatio = matchedCount / totalConditions

    // Step 3: Only include rules where at least 60% of conditions are met
    if (matchRatio >= 0.6) {
      // Step 4: Confidence calculation
      let confidence
      if (matchRatio === 1.0) {
        confidence = 'HIGH'
      } else if (matchRatio >= 0.75) {
        confidence = 'MODERATE'
      } else {
        confidence = 'LOW'
      }

      // Look up the disease object
      const disease = DISEASES.find(d => d.id === rule.diseaseId)
      if (!disease) continue

      results.push({
        ruleId: rule.id,
        diseaseId: rule.diseaseId,
        disease,
        confidence,
        matchedCount,
        totalConditions,
        matchRatio,
        matchedFacts,
        unmatchedFacts,
        // Reasoning chain for the explanation facility (Assignment 3 requirement)
        reasoningChain: buildReasoningChain(rule, matchedFacts, unmatchedFacts, facts),
      })
    }
  }

  // Step 5: Conflict resolution — sort by:
  //   (a) Match ratio (highest first)
  //   (b) Total conditions matched (more specific rules win ties)
  //   (c) Risk level (HIGH risk diseases ranked higher in a tie)
  results.sort((a, b) => {
    if (b.matchRatio !== a.matchRatio) return b.matchRatio - a.matchRatio
    if (b.matchedCount !== a.matchedCount) return b.matchedCount - a.matchedCount
    const riskOrder = { HIGH: 2, MODERATE: 1, LOW: 0 }
    return (riskOrder[b.disease.riskLevel] || 0) - (riskOrder[a.disease.riskLevel] || 0)
  })

  return results
}

/**
 * Build a human-readable reasoning chain for the explanation facility.
 * Maps technical fact names to plain English descriptions.
 */
function buildReasoningChain(rule, matchedFacts, unmatchedFacts, facts) {
  const lines = []

  lines.push(`Rule ${rule.id} evaluated — ${rule.conditions.length} conditions checked:`)

  for (const condition of rule.conditions) {
    const answer = facts[condition.fact]
    const matched = answer === condition.value
    const status = matched ? '✓ MATCHED' : (answer !== undefined ? '✗ NOT MATCHED' : '— NOT ANSWERED')
    lines.push(`  ${status}: ${formatFact(condition.fact)} = "${condition.value}" (farmer answered: "${answer ?? 'not answered'}")`)
  }

  return lines.join('\n')
}

/**
 * Convert a snake_case fact name to a readable label.
 */
function formatFact(factName) {
  return factName
    .replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
}
