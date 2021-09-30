import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Space, Form, Input, Button, message, Tag, Popover } from 'antd';
import Title from 'antd/lib/typography/Title';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Flex from '../../components/Flex';
import TableCustom from '../../components/Table';
import { deleteModel, fetchModels, searchModels } from '../../services/api';

const styles = { icon: { fontSize: 18, cursor: 'pointer' } };

function ModelsList() {
  const [[state, isFetching], setState] = useState([null, true]);
  const [searching, isSearching] = useState(false);
  const history = useHistory();

  const fetchData = (page, order) => {
    fetchModels(page, order)
      .then((s) => setState([s, false]))
      .catch(() => setState([null, false]));
  };

  const removeModel = async (id) => {
    try {
      setState(([c]) => [c, true]);
      await deleteModel(id);
      fetchData();
      message.success('Vous venez de supprimer un modèle avec succès.');
    } catch (err) {
      setState(([c]) => [c, false]);
      message.error('Ouups, la suppression a échoué !');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { title: 'Nom', dataIndex: 'name', sorter: true },
    { title: 'Description', dataIndex: 'description', sorter: true },
    { title: 'Prix', dataIndex: 'price', sorter: true },
    { title: 'Gamme', dataIndex: 'range', sorter: true },
    {
      title: 'Ingrédients',
      dataIndex: 'ingredientModels',
      sorter: true,
      render: (ingredientModels) => (
        <>
          {ingredientModels && ingredientModels.length > 0 ? (
            ingredientModels.map((im) => (
              <Popover content={im.ingredient.description} title={im.ingredient.name}>
                <Tag color="blue" key={im.ingredient.id}>
                  {im.ingredient.name}
                </Tag>
              </Popover>
            ))
          ) : (
            <Tag color="red">Pas d&apos;ingredient pour le moment</Tag>
          )}
        </>
      ),
    },
    {
      key: 'action',
      render: (_, item) => (
        <Space size="large">
          <Link to={{ pathname: 'models/manage', state: { model: item } }}>
            <EditOutlined style={styles.icon} />
          </Link>
          <DeleteOutlined
            onClick={() => removeModel(item.id)}
            style={{ ...styles.icon, color: 'red' }}
          />
        </Space>
      ),
    },
  ];

  const onSearch = async (v) => {
    isSearching(true);
    const result = await searchModels(v);
    setState([result, false]);
    isSearching(false);
  };

  return (
    <>
      <Title>Liste des modèles</Title>
      <Flex style={{ justifyContent: 'space-between', marginBottom: 10 }}>
        <Input.Search
          placeholder="Recherche un modèle"
          allowClear
          enterButton
          style={{ maxWidth: 600, marginRight: 10 }}
          onSearch={onSearch}
          loading={searching}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => history.push('models/manage')}
        >
          Ajouter un nouveau modèle
        </Button>
      </Flex>

      <TableCustom state={state} columns={columns} isFetching={isFetching} fetchData={fetchData} />
    </>
  );
}

export default ModelsList;
