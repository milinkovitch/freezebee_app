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
import { deleteProcess, fetchProcesses, searchProcesses } from '../../services/api';

const styles = { icon: { fontSize: 18, cursor: 'pointer' } };

function ProcessesList() {
  const [[state, isFetching], setState] = useState([null, true]);
  const [searching, isSearching] = useState(false);
  const history = useHistory();

  const fetchData = (page, order) => {
    fetchProcesses(page, order)
      .then((s) => setState([s, false]))
      .catch(() => setState([null, false]));
  };

  const removeProcess = async (id) => {
    try {
      setState(([c]) => [c, true]);
      await deleteProcess(id);
      fetchData();
      message.success('Vous venez de supprimer un processus avec succès.');
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
    {
      key: 'action',
      render: (_, item) => (
        <Space size="large">
          <Link to={{ pathname: 'processes/manage', state: { process: item } }}>
            <EditOutlined style={styles.icon} />
          </Link>
          <DeleteOutlined
            onClick={() => removeProcess(item.id)}
            style={{ ...styles.icon, color: 'red' }}
          />
        </Space>
      ),
    },
  ];

  const onSearch = async (v) => {
    isSearching(true);
    const result = await searchProcesses(v);
    setState([result, false]);
    isSearching(false);
  };

  return (
    <>
      <Title>Liste des processus</Title>
      <Flex style={{ justifyContent: 'space-between', marginBottom: 10 }}>
        <Input.Search
          placeholder="Rechercher un processus"
          allowClear
          enterButton
          style={{ maxWidth: 600, marginRight: 10 }}
          onSearch={onSearch}
          loading={searching}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => history.push('processes/manage')}
        >
          Ajouter un nouveau processus
        </Button>
      </Flex>

      <TableCustom state={state} columns={columns} isFetching={isFetching} fetchData={fetchData} />
    </>
  );
}

export default ProcessesList;
