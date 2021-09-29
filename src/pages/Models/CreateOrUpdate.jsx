/* eslint-disable no-param-reassign */
import { Button, Input, Form, message, InputNumber } from 'antd';
import Title from 'antd/lib/typography/Title';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import SelectIngredients from '../../components/form/SelectIngredients';
import { createModel, updateModel } from '../../services/api';

function CreateOrUpdateModel() {
  const location = useLocation();
  const history = useHistory();
  const formRef = useRef();
  const [state, setState] = useState({ isFetching: false, err: null });
  const [model, setModel] = useState(null);

  useEffect(() => {
    async function initForm() {
      // eslint-disable-next-line no-underscore-dangle
      const _model = location.state?.model;
      _model.ingredients = _model.ingredients ? _model.ingredients.map((i) => i.id) : [];
      await setModel(_model);
      formRef.current.resetFields();
    }

    if (location.state && formRef) {
      initForm();
    }
  }, [location, formRef]);

  const create = async (values) => {
    setState({ isFetching: true, err: null });
    try {
      if (model) {
        values.id = model.id;
        await updateModel(model.id, values);
        message.success(`Vous venez de modifier le modèle ${values.name} avec succès !`);
      } else {
        await createModel(values);
        message.success("Vous venez d'ajouter un nouveau modèle avec succès !");
        if (formRef.current) formRef.current.resetFields();
      }
      history.push('/models');
      setState({ isFetching: false, err: null });
    } catch (err) {
      setState({ isFetching: false, err });
    }
  };

  return (
    <div>
      <Title>
        {model ? (
          <>
            Modifier le modèle <i>{model.name}</i>
          </>
        ) : (
          'Créer un nouveau modèle'
        )}
      </Title>
      <Form
        ref={formRef}
        layout="vertical"
        name="model"
        onFinish={create}
        initialValues={model}
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

        <Form.Item
          label="Prix unitaire hors taxes"
          name="price"
          rules={[{ required: true, message: 'Le prix est obligatoire.' }]}
        >
          <InputNumber />
        </Form.Item>

        <SelectIngredients />

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={state.isFetching}>
            {model ? 'Modifier' : 'Créer'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreateOrUpdateModel;
