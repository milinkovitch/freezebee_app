/* eslint-disable react/prop-types */
import { Form, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { fetchIngredients } from '../../services/api';

function SelectIngredients() {
  const [[ingredients, isFetching], setState] = useState([[], true]);
  const fetchData = (page, order) => {
    fetchIngredients(page, order)
      .then((s) => setState([s, false]))
      .catch(() => setState([null, false]));
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Form.Item label="Ingrédients" name="ingredients">
      <Select
        mode="multiple"
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        showSearch
        loading={isFetching}
      >
        {ingredients &&
          ingredients.map((i) => (
            <Select.Option key={i.id} value={i.id}>
              {i.name}
            </Select.Option>
          ))}
      </Select>
    </Form.Item>
  );
}

export default SelectIngredients;
