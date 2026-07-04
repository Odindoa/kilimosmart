import { createContext, useContext, useState } from 'react'

const LangContext = createContext()

export function LangProvider({ children }) {
  const [lang, setLang] = useState('en')
  const toggle = () => setLang(l => l === 'en' ? 'sw' : 'en')
  const t = (obj) => {
    if (!obj) return ''
    if (typeof obj === 'string') return obj
    return obj[lang] || obj.en || ''
  }
  return (
    <LangContext.Provider value={{ lang, setLang, toggle, t }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)

// Static UI strings
export const UI = {
  // Nav
  diagnose:     { en: 'Diagnose',        sw: 'Chunguza' },
  history:      { en: 'History',         sw: 'Historia' },
  officer:      { en: 'Officer View',    sw: 'Mtazamo wa Afisa' },
  knowledgeBase:{ en: 'Knowledge Base',  sw: 'Msingi wa Maarifa' },
  // Crop select
  selectCrop:   { en: 'Which crop needs diagnosis?', sw: 'Zao gani linahitaji uchunguzi?' },
  selectSub:    { en: 'Select the affected crop to begin the symptom assessment', sw: 'Chagua zao lililoathirika kuanza tathmini ya dalili' },
  startDiag:    { en: 'Start Diagnosis', sw: 'Anza Uchunguzi' },
  // Questions
  question:     { en: 'Question',        sw: 'Swali' },
  of:           { en: 'of',              sw: 'ya' },
  next:         { en: 'Next',            sw: 'Ijayo' },
  back:         { en: 'Back',            sw: 'Rudi' },
  finish:       { en: 'Get Diagnosis',   sw: 'Pata Utambuzi' },
  // Results
  diagResult:   { en: 'Diagnosis Result', sw: 'Matokeo ya Utambuzi' },
  confidence:   { en: 'Confidence',       sw: 'Uhakika' },
  causalAgent:  { en: 'Causal Agent',     sw: 'Chanzo' },
  treatment:    { en: 'Recommended Actions', sw: 'Hatua Zinazopendekezwa' },
  prevention:   { en: 'Prevention',       sw: 'Kinga' },
  alsoCons:     { en: 'Also consider',    sw: 'Pia fikiria' },
  reasoning:    { en: 'Show reasoning',   sw: 'Onyesha mantiki' },
  newDiag:      { en: 'New Diagnosis',    sw: 'Uchunguzi Mpya' },
  shareWA:      { en: 'Share via WhatsApp', sw: 'Shiriki kupitia WhatsApp' },
  noMatch:      { en: 'No confident diagnosis found', sw: 'Hakuna utambuzi ulioonekana' },
  noMatchBody:  { en: 'The symptoms entered did not strongly match a known disease profile. Please consult your local extension officer.', sw: 'Dalili zilizowekwa hazikuoanisha kwa nguvu wasifu wa ugonjwa unaojulikana. Tafadhali wasiliana na afisa wako wa kilimo wa mtaa.' },
  // History
  histTitle:    { en: 'Diagnosis History', sw: 'Historia ya Utambuzi' },
  histEmpty:    { en: 'No diagnoses recorded yet. Run a diagnosis to see your history here.', sw: 'Hakuna utambuzi uliorekodiwa bado. Fanya uchunguzi kuona historia yako hapa.' },
  filterCrop:   { en: 'Filter by crop',   sw: 'Chuja kwa zao' },
  allCrops:     { en: 'All crops',        sw: 'Mazao yote' },
  viewDetails:  { en: 'View details',     sw: 'Tazama maelezo' },
  // Officer
  offTitle:     { en: 'Extension Officer Dashboard', sw: 'Dashibodi ya Afisa wa Kilimo' },
  offSub:       { en: 'Disease surveillance summary across all registered diagnoses', sw: 'Muhtasari wa ufuatiliaji wa magonjwa kwenye uchunguzi wote uliorekodiwa' },
  totalDiag:    { en: 'Total Diagnoses',  sw: 'Jumla ya Uchunguzi' },
  highConf:     { en: 'High Confidence',  sw: 'Uhakika wa Juu' },
  cropsAff:     { en: 'Crops Affected',   sw: 'Mazao Yaliyoathirika' },
  topDiseases:  { en: 'Top Diseases',     sw: 'Magonjwa ya Juu' },
  byCrop:       { en: 'Diagnoses by Crop', sw: 'Uchunguzi kwa Zao' },
  trend:        { en: 'Daily Trend (7 days)', sw: 'Mwelekeo wa Kila Siku (siku 7)' },
  // KB
  kbTitle:      { en: 'Knowledge Base', sw: 'Msingi wa Maarifa' },
  kbSub:        { en: 'All crops, diseases, and diagnostic rules loaded in the system', sw: 'Mazao yote, magonjwa, na sheria za utambuzi zilizopakiwa kwenye mfumo' },
  rules:        { en: 'Rules', sw: 'Sheria' },
  diseases:     { en: 'Diseases', sw: 'Magonjwa' },
  crops:        { en: 'Crops', sw: 'Mazao' },
  ruleId:       { en: 'Rule ID', sw: 'Kitambulisho' },
  disease:      { en: 'Disease', sw: 'Ugonjwa' },
  crop:         { en: 'Crop', sw: 'Zao' },
  conditions:   { en: 'Conditions', sw: 'Masharti' },
  risk:         { en: 'Risk', sw: 'Hatari' },
  // General
  loading:      { en: 'Loading…',  sw: 'Inapakia…' },
  error:        { en: 'Error',     sw: 'Hitilafu' },
  farmer:       { en: 'Farmer name (optional)', sw: 'Jina la mkulima (si lazima)' },
  county:       { en: 'County (optional)',       sw: 'Kaunti (si lazima)' },
}
