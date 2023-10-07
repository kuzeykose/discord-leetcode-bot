# What is this?

This discord bot is generating a leet code question every Sunday at 02:00AM.

## How it works?

##### Step 1) Get random question

1. Get problem set for getting total question count
2. Generate randomNumber between 0 to total question number - 1
3. Get question with skipping to randomNumber and limit 1.

##### Step 2) Get problem data

1. Get problem content with GET Content
2. Get title information with GET Title
3. Get hints with GET hints

(You can reach all these methods in section "Methods")

##### Step 3) Check question data

In step 3, we need to confirm that the question must be under 2000 characters and problem difficulty should be medium. If the generated question difficulty is hard or easy and character length is over than 2000 then regenarate the question.

1. Check if question length grater than 2000 -> regenerate
2. Check if problem difficulty is hard or easy -> regenerate

## Environment

You have to create your own .env

```
  DISCORD_TOKEN='DISCORD_TOKEN'
  CLIENT_ID="CLIENT_ID"
  GUILD_ID="GUILD_ID"
  CHANNEL_ID="CHANNEL_ID"
```

### Problems

1. Getting Content

```
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
```

2. Getting Hint

```
- GET hints
  curl -X POST https://leetcode.com/graphql \
   -H "Content-Type: application/json" \
   -d '{
  "query": "query questionHints($titleSlug: String!) { question(titleSlug: $titleSlug) { hints } }",
  "variables": {
  "titleSlug": "merge-intervals"
  }
  }'
```

3. Getting Title

```
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
```

### Problem List

1. Getting Problem set

```
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
```

### Resources

[Discord.js](https://discord.js.org).
[Discord.js Guide](https://discordjs.guide).

### Backlog

- [ ] Store asked question for disabling reasking.
- [ ] Translate question with AI model different languages.
