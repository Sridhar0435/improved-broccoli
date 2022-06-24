export const constants = {
  userGroupTableHeaders: [
    {
      field: 'groupId',
      headerName: 'Group ID',
      width: 100,
    },
    {
      field: 'groupName',
      headerName: 'Group Name',
      width: 150,
    },
    {
      field: 'groupDesc',
      headerName: 'Descriptions',
      width: 200,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
    },
    {
      field: 'productHierarchy',
      headerName: 'Product Hierarchies',
      width: 170,
    },
    {
      field: 'locationHierarchy',
      headerName: 'Location Hierarchies',
      width: 200,
    },
  ],

  viewHierarchy: [
    { field: 'hierarchyId', headerName: 'Hierarchy Id', width: 100 },
    { field: 'hierarchyLevel', headerName: 'Hierarchy Level', width: 100 },
    { field: 'startDate', headerName: 'Start Date', width: 100 },
    { field: 'endDate', headerName: 'End Date', width: 100 },
  ],

  // groupstatuses: [
  //   {
  //     statusID: 'A',
  //     text: 'Active',
  //   },
  //   {
  //     statusID: 'I',
  //     text: 'Inactive',
  //   },
  //   {
  //     statusID: 'D',
  //     text: 'Deleted',
  //   },
  // ],
  groupstatuses: [
    {
      value: 'A',
      label: 'Active',
    },
    {
      value: 'I',
      label: 'Inactive',
    },
    {
      value: 'D',
      label: 'Deleted',
    },
  ],
}
