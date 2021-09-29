/* eslint-disable no-param-reassign */
import { Button, Input, Form, message, InputNumber } from 'antd';
import Title from 'antd/lib/typography/Title';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { createIngredient, updateIngredient } from '../../services/api';

function CreateOrUpdateIngredient() {
  const location = useLocation();
  const history = useHistory();
  const formRef = useRef();
  const [state, setState] = useState({ isFetching: false, err: null });
  const [ingredient, setIngredient] = useState(null);

  useEffect(() => {
    async function initForm() {
      // eslint-disable-next-line no-underscore-dangle
      const _ingredient = location.state?.ingredient;
      await setIngredient(_ingredient);
      formRef.current.resetFields();
    }

    if (location.state && formRef) {
      initForm();
    }
  }, [location, formRef]);

  const create = async (values) => {
    setState({ isFetching: true, err: null });
    try {
      if (ingredient) {
        values.id = ingredient.id;
        await updateIngredient(ingredient.id, values);
        message.success(`Vous venez de modifier le modèle ${values.name} avec succès !`);
      } else {
        await createIngredient(values);
        message.success("Vous venez d'ajouter un nouveau modèle avec succès !");
        if (formRef.current) formRef.current.resetFields();
      }

      history.push('/ingredients');
      setState({ isFetching: false, err: null });
    } catch (err) {
      setState({ isFetching: false, err });
    }
  };

  return (
    <div>
      <Title>
        {ingredient ? (
          <>
            Modifier l&apos;ingrédient <i>{ingredient.name}</i>
          </>
        ) : (
          'Créer un nouvel ingrédient'
        )}
      </Title>
      <Form
        ref={formRef}
        layout="vertical"
        name="ingredient"
        onFinish={create}
        initialValues={ingredient}
        scrollToFirstError
      >
        <Form.Item
          label="Nom"
          name="name"
          rules={[{ required: true, message: 'Le nom est obligatoire.' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'La description est obligatoire.' }]}
        >
          <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={state.isFetching}>
            {ingredient ? 'Modifier' : 'Créer'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreateOrUpdateIngredient;
