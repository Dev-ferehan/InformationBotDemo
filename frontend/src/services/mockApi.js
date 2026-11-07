export async function sendMessageToAI(message) {
  await new Promise((resolve) => window.setTimeout(resolve, 550))
  const text = message.toLowerCase()
  if (text.includes('passport') || text.includes('ፓስፖርት')) {
    return {
      en: 'Prepare a valid ID, proof of citizenship, and the required application information. Apply through the official immigration service, and confirm appointment and fee details before you go.',
      am: 'ለፓስፖርት ማመልከቻ ትክክለኛ መታወቂያ፣ የዜግነት ማረጋገጫ እና የማመልከቻ መረጃዎችን ያዘጋጁ። በይፋዊው የኢሚግሬሽን አገልግሎት ያመልክቱ፤ ከመሄድዎ በፊት የቀጠሮ እና የክፍያ መረጃን ያረጋግጡ።',
    }
  }
  if (text.includes('business') || text.includes('license') || text.includes('ንግድ') || text.includes('ፈቃድ')) {
    return {
      en: 'Renewing a business license commonly requires an active business registration, current tax clearance, and a renewal fee. Requirements may vary by business type, so confirm them with your local trade office.',
      am: 'የንግድ ፈቃድ እድሳት ብዙውን ጊዜ ንቁ የንግድ ምዝገባ፣ ወቅታዊ የታክስ ማጽዳት እና የእድሳት ክፍያ ይፈልጋል። መስፈርቶቹ እንደ ንግድ ዓይነቱ ሊለያዩ ስለሚችሉ ከአካባቢዎ የንግድ ጽሕፈት ቤት ያረጋግጡ።',
    }
  }
  if (text.includes('land') || text.includes('መሬት')) {
    return {
      en: 'Land registration usually begins at your local land administration office. Bring your ID and proof-of-ownership documents, and ask the office to confirm the property record, required forms, and fees.',
      am: 'የመሬት ምዝገባ ብዙውን ጊዜ በአካባቢዎ የመሬት አስተዳደር ጽሕፈት ቤት ይጀምራል። መታወቂያዎን እና የባለቤትነት ማረጋገጫ ሰነዶችን ይዘው ይሂዱ፤ ቢሮው የመሬት መለያ መዝገብ፣ ቅጾች እና ክፍያዎችን ያረጋግጣል።',
    }
  }
  if (text.includes('tax') || text.includes('ታክስ') || text.includes('ግብር')) {
    return {
      en: 'Tax obligations vary by taxpayer category and activity. Confirm current filing guidance, payment options, and deadlines with the official revenue authority.',
      am: 'የታክስ ግዴታዎች እንደ ግብር ከፋይ ምድብዎ እና እንቅስቃሴዎ ይለያያሉ። ወቅታዊ የማስታወቂያ መመሪያ፣ የክፍያ መንገዶች እና የጊዜ ገደቦችን በይፋዊው የገቢዎች ባለሥልጣን ያረጋግጡ።',
    }
  }
  return {
    en: 'I can help you get started. Tell me which service you need—passport, business license, land registration, or tax—or browse the step-by-step guides. Confirm final requirements with the relevant government office.',
    am: 'ለመጀመር ልረዳዎ እችላለሁ። የትኛውን አገልግሎት እንደሚፈልጉ ይንገሩኝ—ፓስፖርት፣ የንግድ ፈቃድ፣ የመሬት ምዝገባ ወይም ታክስ—ወይም ደረጃ በደረጃ መመሪያ ይመልከቱ። የመጨረሻ መስፈርቶችን ከሚመለከተው የመንግሥት ቢሮ ያረጋግጡ።',
  }
}

export async function uploadDocument(file) {
  if (!file) return null
  await new Promise((resolve) => window.setTimeout(resolve, 350))
  return { name: file.name, size: file.size, type: file.type }
}


