/* eslint-disable react/prop-types */
import { Table } from 'antd';
import React from 'react';

function TableCustom({ state, columns, isFetching, fetchData }) {
  const data = state || [];
  const meta = state?.meta;

  return (
    <Table
      rowKey={() => Math.random()}
      dataSource={data}
      columns={columns}
      loading={isFetching}
      scroll={{ x: true }}
      pagination={{
        current: meta?.current_page,
        pageSize: meta?.per_page,
        total: meta?.total,
      }}
      onChange={(pagination, _, sorter) => {
        const order =
          sorter && sorter.field && sorter.order
            ? {
                property: sorter.field,
                direction: sorter.order === 'ascend' ? 'asc' : 'desc',
              }
            : null;
        fetchData(pagination.current, order);
      }}
    />
  );
}

export default TableCustom;
