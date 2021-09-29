/* eslint-disable no-param-reassign */
import { Button, Input, Form, message, InputNumber } from 'antd';
import Title from 'antd/lib/typography/Title';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import SelectSteps from '../../components/form/SelectSteps';
import { createProcess, updateProcess } from '../../services/api';

function CreateOrUpdateProcess() {
  const location = useLocation();
  const history = useHistory();
  const formRef = useRef();
  const [state, setState] = useState({ isFetching: false, err: null });
  const [process, setProcess] = useState(null);

  useEffect(() => {
    async function initForm() {
      // eslint-disable-next-line no-underscore-dangle
      const _process = location.state?.process;
      await setProcess(_process);
      formRef.current.resetFields();
    }

    if (location.state && formRef) {
      initForm();
    }
  }, [location, formRef]);

  const create = async (values) => {
    setState({ isFetching: true, err: null });
    try {
      if (process) {
        values.id = process.id;
        await updateProcess(process.id, values);
        message.success(`Vous venez de modifier le processus ${values.name} avec succès !`);
      } else {
        await createProcess(values);
        message.success("Vous venez d'ajouter un nouveau processus avec succès !");
        if (formRef.current) formRef.current.resetFields();
      }

      history.push('/processes');
      setState({ isFetching: false, err: null });
    } catch (err) {
      setState({ isFetching: false, err });
    }
  };

  return (
    <div>
      <Title>
        {process ? (
          <>
            Modifier le processus <i>{process.name}</i>
          </>
        ) : (
          'Créer un nouveau processus'
        )}
      </Title>
      <Form
        ref={formRef}
        layout="vertical"
        name="process"
        onFinish={create}
        initialValues={process}
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

        <SelectSteps />

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={state.isFetching}>
            {process ? 'Modifier' : 'Créer'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreateOrUpdateProcess;
