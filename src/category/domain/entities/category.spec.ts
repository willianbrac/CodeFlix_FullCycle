import { omit } from "lodash";
import { Category, CategoryProperties } from "./category";
import UniqueEntityId from "../../../shared/domain/value-objects/unique-entity-id";

describe("Category unit tests", () => {
    test("constructor of category", () => {
      const props = {
        name: 'category name',
        description: 'some description',
        is_active: true,
        created_at: new Date()
      }

      const category = new Category(props);

      expect(category.props).toStrictEqual(props);
    });

    test("constructor of category with partial properties", () => {
      const category = new Category({ name: 'category name' });
      const props = omit(category.props, 'created_at');
  
      expect(props).toStrictEqual({
        name: 'category name',
        description: null,
        is_active: true,
      });

      expect(category.props.created_at).toBeInstanceOf(Date);
    });

    test("constructor of category with is_active is false", () => {
      const props = {
        name: 'category name',
        description: 'some description',
        is_active: false,
        created_at: new Date()
      }

      const category = new Category(props);
  
      expect(category.props).toStrictEqual({
        name: 'category name',
        description: 'some description',
        is_active: false,
        created_at: props.created_at
      });
      
    });

    test("constructor of category with not description", () => {
      const props = {
        name: 'category name',
        is_active: false,
      }

      const category = new Category(props);
  
      expect(category.props).toMatchObject(props);
      
    });

    test("id field", () => {
      type CategoryData = { props: CategoryProperties, id?: UniqueEntityId };
      const data: CategoryData[] = [
        { props: {name: 'category name'} },
        { props: {name: 'category name'}, id: null },
        { props: {name: 'category name'}, id: undefined },
        { props: {name: 'category name'}, id: new UniqueEntityId() },
      ];
      data.forEach((i) => {
        const category = new Category(i.props, i.id);
        expect(category.id).not.toBeNull();
        expect(category.id).toBeInstanceOf(UniqueEntityId);
      })
    });
});