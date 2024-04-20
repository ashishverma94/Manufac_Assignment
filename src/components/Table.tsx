import { Table } from "@mantine/core";

interface elementsType{
  Measure:string,
  class1:string,
  class2:string,
  class3:string,
}

const TableComponent = ({ elements }:any) => {
    const rows = elements.map((element:elementsType) => (
    <Table.Tr key={element.Measure}>
      <Table.Td>{element.Measure}</Table.Td>
      <Table.Td>{element.class1}</Table.Td>
      <Table.Td>{element.class2}</Table.Td>
      <Table.Td>{element.class3}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table
      striped
      highlightOnHover
      withTableBorder
      withColumnBorders
      horizontalSpacing="lg"
      verticalSpacing="md"
      className="table-main"
    >
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Measure</Table.Th>
          <Table.Th>Class 1</Table.Th>
          <Table.Th>Class 2</Table.Th>
          <Table.Th>Class 3</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default TableComponent;
