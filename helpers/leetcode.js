async function getLeetCodeProblemList(problemIndex) {
  const body = {
    query:
      "query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {problemsetQuestionList: questionList( categorySlug: $categorySlug limit: $limit skip: $skip filters: $filters) { total: totalNum questions: data { acRate difficulty freqBar frontendQuestionId: questionFrontendId isFavor paidOnly: isPaidOnly status title titleSlug topicTags {name id slug } hasSolution hasVideoSolution}}}",
    variables: {
      categorySlug: "",
      skip: problemIndex - 1,
      limit: 1,
      filters: {},
    },
    operationName: "problemsetQuestionList",
  };

  try {
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => {
      return res.json();
    });

    if (response) {
      return response.data.problemsetQuestionList;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getLeetCodeProblemListCount() {
  const body = {
    query:
      "query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {problemsetQuestionList: questionList( categorySlug: $categorySlug limit: $limit skip: $skip filters: $filters) { total: totalNum questions: data { acRate difficulty freqBar frontendQuestionId: questionFrontendId isFavor paidOnly: isPaidOnly status title titleSlug topicTags {name id slug } hasSolution hasVideoSolution}}}",
    variables: {
      categorySlug: "",
      skip: 1,
      limit: 1,
      filters: {},
    },
    operationName: "problemsetQuestionList",
  };

  try {
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => {
      return res.json();
    });

    if (response) {
      return response.data.problemsetQuestionList.total;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getLeetCodeProblemContent(titleSlug) {
  const body = {
    operationName: "questionContent",
    query:
      "query questionContent($titleSlug: String!) { question(titleSlug: $titleSlug) { content mysqlSchemas dataSchemas } }",
    variables: {
      titleSlug,
    },
  };

  try {
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => {
      return res.json();
    });

    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getLeetCodeProblemHints(titleSlug) {
  const body = {
    query:
      "query questionHints($titleSlug: String!) { question(titleSlug: $titleSlug) { hints } }",
    variables: {
      titleSlug,
    },
  };

  try {
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => {
      return res.json();
    });

    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getLeetCodeProblemTitle(titleSlug) {
  const body = {
    operationName: "questionTitle",
    query:
      "query questionTitle($titleSlug: String!) { question(titleSlug: $titleSlug) { questionId questionFrontendId title titleSlug isPaidOnly difficulty likes dislikes categoryTitle } }",
    variables: {
      titleSlug,
    },
  };

  try {
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => {
      return res.json();
    });

    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = {
  async getLeetCodeProblem() {
    try {
      const getTotal = await getLeetCodeProblemListCount();
      if (getTotal) {
        const totalCount = getTotal - 1;
        const getRandomQuestionIndex = Math.floor(Math.random() * totalCount);
        const getProblem = await getLeetCodeProblemList(getRandomQuestionIndex);
        const titleSlug = getProblem.questions[0].titleSlug;

        const response = await Promise.all([
          getLeetCodeProblemContent(titleSlug),
          getLeetCodeProblemHints(titleSlug),
          getLeetCodeProblemTitle(titleSlug),
        ]).then((res) => {
          return res;
        });

        if (response) {
          return response;
        }
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};
