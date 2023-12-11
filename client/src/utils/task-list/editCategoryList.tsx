import { TaskListType } from "../../types/CategoryListType";

export const editCategoryList = (
  categoryName: string,
  propertyToChange: string,
  newValue: string,
  categoryList,
  setCategoryList
) => {
  setCategoryList(
    categoryList.map((category: TaskListType) => {
      if (category.category === categoryName) {
        return {
          ...category,
          [propertyToChange]: newValue,
        };
      }
      return category;
    })
  );
};
