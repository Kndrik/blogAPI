import axios from "axios";

export const getAllArticles = async () => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + "/articles"
    );
    return response.data;
  } catch (err) {
    throw new Error("Failed to fetch articles", err);
  }
};

export const getArticleById = async (articleId) => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + `/articles/${articleId}`
    );
    return response.data;
  } catch (err) {
    throw new Error("Failed to fetch the article", err);
  }
};

export const deleteArticle = async (articleId) => {
  try {
    await axios.delete(
      process.env.REACT_APP_API_URL + `/articles/${articleId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("blogJWT")}`,
        },
      }
    );
  } catch (err) {
    throw new Error("Failed to delete the article", err);
  }
};

export const editArticle = async (articleId, data) => {
  try {
    await axios.put(
      process.env.REACT_APP_API_URL + `/articles/${articleId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("blogJWT")}`,
        },
      }
    );
  } catch (err) {
    throw new Error("Failed to edit the article", err);
  }
};

export const getJWT = async (data) => {
  try {
    const result = await axios.post(
      process.env.REACT_APP_API_URL + "/auth/login",
      data
    );
    return result.data.token;
  } catch (err) {
    throw new Error("Failed to retreive the JWT", err);
  }
};

export const deleteComment = async (articleId, commentId) => {
  try {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/articles/${articleId}/comments/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("blogJWT")}`,
        },
      }
    );
  } catch (err) {
    throw new Error("Failed to delete the comment", err);
  }
};

export const createArticle = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/articles`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("blogJWT")}`,
        },
      }
    );
    return response;
  } catch (err) {
    throw new Error("Failed to create the article", err);
  }
};
