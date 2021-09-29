import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Space, Form, Input, Button, message } from 'antd';
import Title from 'antd/lib/typography/Title';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Flex from '../../components/Flex';
import TableCustom from '../../components/Table';
import { deleteIngredient, fetchIngredients } from '../../services/api';

const styles = { icon: { fontSize: 18, cursor: 'pointer' } };

function IngredientsList() {
  const [[state, isFetching], setState] = useState([null, true]);
  const history = useHistory();

  const fetchData = (page, order) => {
    fetchIngredients(page, order)
      .then((s) => setState([s, false]))
      .catch(() => setState([null, false]));
  };

  const removeIngredient = async (id) => {
    try {
      setState(([c]) => [c, true]);
      await deleteIngredient(id);
      fetchData();
      message.success('Vous venez de supprimer un modèle avec succès.');
    } catch (err) {
      setState(([c]) => [c, false]);
      // message.error(t('FRONT_NOTIFICATION_DELETE_FAILED'));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { title: 'Nom', dataIndex: 'name', sorter: true },
    { title: 'Description', dataIndex: 'description', sorter: true },
    {
      key: 'action',
      render: (_, item) => (
        <Space size="large">
          <Link to={{ pathname: 'ingredients/manage', state: { ingredient: item } }}>
            <EditOutlined style={styles.icon} />
          </Link>
          <DeleteOutlined
            onClick={() => removeIngredient(item.id)}
            style={{ ...styles.icon, color: 'red' }}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Title>Liste des ingrédients</Title>
      <Flex style={{ justifyContent: 'space-between', marginBottom: 10 }}>
        <Input.Search
          placeholder="Recherche un ingrédient"
          allowClear
          enterButton
          style={{ maxWidth: 600, marginRight: 10 }}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => history.push('ingredients/manage')}
        >
          Ajouter un nouvel ingrédient
        </Button>
      </Flex>

      <TableCustom state={state} columns={columns} isFetching={isFetching} fetchData={fetchData} />
    </>
  );
}

export default IngredientsList;
