const getNewFileContent = () => {
  const today = new Date(Date.now());

  return {
    "name": `챗봇 데이터_${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`,
    "engine": "/testapp/v1/completions/LK-B",
    "topP": 0.8,
    "topK": 0,
    "title": "",
    "text": "",
    "maxTokens": 100,
    "temperature": 0.5,
    "repeatPenalty": 5,
    "start": "",
    "restart": "",
    "stopBefore": [],
    "includeTokens": true,
    "includeAiFilters": true,
    "includeProbs": false
  }
}

export default getNewFileContent;