/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Avatar, Divider } from 'antd';
import React, { useEffect, useState } from 'react';
import { fetchIngredients } from '../../services/api';
import Flex from '../Flex';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 23 },
  },
};

function SelectSteps() {
  return (
    <Form.List
      name="steps"
      rules={[
        {
          // eslint-disable-next-line consistent-return
          validator: async (_, steps) => {
            if (!steps || steps.length < 2) {
              return Promise.reject(new Error('Vous devez renseigner au moins deux étapes !'));
            }
          },
        },
      ]}
    >
      {(fields, { add, remove }, { errors }) => (
        <>
          {fields.map(({ key, name, fieldKey, index, ...restField }) => (
            <>
              <Divider>
                <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{name}</Avatar>
              </Divider>
              <Flex style={{ justifyContent: 'start', width: '100%' }}>
                <Form.Item
                  {...formItemLayout}
                  required
                  key={fieldKey}
                  style={{ flex: 1, marginBottom: 0 }}
                >
                  <Form.Item name={[name, 'order']} initialValue={name} style={{ display: 'none' }}>
                    <Input type="text" value={name} />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'name']}
                    fieldKey={[fieldKey, 'name']}
                    rules={[{ required: true, message: 'Le nom est obligatoire.' }]}
                  >
                    <Input placeholder="Nom de l'étape" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'description']}
                    fieldKey={[fieldKey, 'description']}
                    rules={[{ required: true, message: 'La description est obligatoire.' }]}
                  >
                    <Input.TextArea placeholder="Description de l'étape" />
                  </Form.Item>
                </Form.Item>
                <MinusCircleOutlined
                  style={{ fontSize: 24, color: '#ff0000' }}
                  onClick={() => remove(name)}
                />
              </Flex>
            </>
          ))}
          <Form.Item>
            <Button
              type="dashed"
              onClick={() => add()}
              style={{ width: '100%' }}
              icon={<PlusOutlined />}
            >
              Ajouter une étape
            </Button>
            <Form.ErrorList errors={errors} />
          </Form.Item>
        </>
      )}
    </Form.List>
  );
}

export default SelectSteps;
