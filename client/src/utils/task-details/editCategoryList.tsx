import { CategoryType } from "../../types/CategoryListType";

export const editCategoryList = (
  categoryName,
  propertyToChange,
  newValue,
  categoryList,
  setCategoryList
) => {
  setCategoryList(
    categoryList.map((category: CategoryType) => {
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
