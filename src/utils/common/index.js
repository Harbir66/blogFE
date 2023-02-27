/* eslint-disable import/prefer-default-export */
import { monthNames } from '../../constants/postCard';

export const getFormattedDateFromUtcDate = (utcDate) => {
  const date = new Date(utcDate);
  return `${date.getDate()} ${
    monthNames[date.getMonth()]
  } ${date.getFullYear()}`;
};

export const getBlogIndexById = (allBlogsData, selectedBlogId) => {
  const blogIndex = allBlogsData.findIndex(
    (blog) => blog.id === selectedBlogId
  );
  return blogIndex;
};

export const updateBlogData = (
  updatedBlogData,
  allBlogsData,
  setAllBlogsData
) => {
  const blogIndex = getBlogIndexById(allBlogsData, updatedBlogData.id);
  setAllBlogsData([
    ...allBlogsData.slice(0, blogIndex),
    updatedBlogData,
    ...allBlogsData.slice(blogIndex + 1),
  ]);
};
// export default getFormattedDateFromUtcDate;
