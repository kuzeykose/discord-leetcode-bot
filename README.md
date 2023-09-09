--- CONFIG -----
you have to create your own config.json
{
"token": TOKEN,
"clientId": CLIENT_ID,
"guildId": GUILD_ID
}

------- RESOURCE ------

https://dev.to/en3sis/advanced-discord-js-custom-embeds-using-attachments-2bpn

------- FLOW -----

Total = 2842
Random -> 0 , (total - 1) -> 55
skip 2 , limit: 1

STEP 1 get random question

1. get problem set for getting total question count
2. create randomNumber between 0 to total question - 1
3. get question with skip=(randomNumber) and limit=1

STEP 2 get problem data

1. get problem content with GET Content
2. get title information with GET Title
3. get hints with GET hints

STEP 3 check question data

1. question length > 2000 -> regenerate
2. hard and easy problems -> regenerate
3. store all questions id's

------- PROBLEM ------

- GET Content
  curl -X POST https://leetcode.com/graphql \
   -H "Content-Type: application/json" \
   -d '{
  "operationName":"questionContent",
  "query": "query questionContent($titleSlug: String!) { question(titleSlug: $titleSlug) { content mysqlSchemas dataSchemas } }",
  "variables": {
  "titleSlug": "container-with-most-water"
  }
  }'

- GET hints
  curl -X POST https://leetcode.com/graphql \
   -H "Content-Type: application/json" \
   -d '{
  "query": "query questionHints($titleSlug: String!) { question(titleSlug: $titleSlug) { hints } }",
  "variables": {
  "titleSlug": "merge-intervals"
  }
  }'

- GET Title
  curl -X POST https://leetcode.com/graphql \
   -H "Content-Type: application/json" \
   -d '{
  "operationName":"questionTitle",
  "query": "query questionTitle($titleSlug: String!) { question(titleSlug: $titleSlug) { questionId questionFrontendId title titleSlug isPaidOnly difficulty likes dislikes categoryTitle } }",
  "variables": {
  "titleSlug": "merge-intervals"
  }
  }'

------- PROBLEM LIST --------

- GET problem set
  curl -X POST https://leetcode.com/graphql \
   -H "Content-Type: application/json" \
   -d '{
  "query": "query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {problemsetQuestionList: questionList( categorySlug: $categorySlug limit: $limit skip: $skip filters: $filters) { total: totalNum questions: data { acRate difficulty freqBar frontendQuestionId: questionFrontendId isFavor paidOnly: isPaidOnly status title titleSlug topicTags {name id slug } hasSolution hasVideoSolution}}}",
  "variables": {
  "categorySlug": "",
  "skip": 10,
  "limit": 1,
  "filters": {}
  },
  "operationName": "problemsetQuestionList"
  }'

  -------- BACKLOG --------

  - Soruyu AI model ile translate et (maybe)
