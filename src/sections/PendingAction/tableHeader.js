export const pendingActionDetails = [
  {
    requestedId: '0123456',
    assignedTo: 'Mark B',
    timeStamp: '18-Oct-21',
    requestedBy: 'Daniel Paul',
    role: 'Role 1',
    action: 'Create New User',
    comments: 'Please modify personal details',
    firstName: 'John',
    middleName: 'K',
    lastName: 'Smith',
    employeeId: '123456',
    emailId: 'johnksmith@morrisonsplc.co.uk',
  },
  {
    requestedId: '325641',
    assignedTo: 'Mark B',
    timeStamp: '19-Oct-21',
    requestedBy: 'Rio Lobo',
    role: 'Role 2',
    action: 'Reassign',
    comments: 'Please provide role and group details',
    firstName: 'Jordan',
    middleName: 'M',
    lastName: 'Black',
    employeeId: '123456',
    emailId: 'jordanmblack@morrisonsplc.co.uk',
  },
]
export const pendingActionTableHeaders = [
  {
    field: 'requestId',
    headerName: 'Requested ID',
    width: 150,
  },
  {
    field: 'assignedToUserName',
    headerName: 'Assigned To',
    width: 100,
  },
  {
    // field: 'assignedTimeStamp',
    field: 'requestTimestamp',
    headerName: 'timestamp',
    width: 150,
  },
  {
    field: 'requestorFullName',
    headerName: 'Requested By',
    width: 100,
  },
  {
    field: 'requestorRole',
    headerName: 'Role',
    width: 100,
  },
  {
    field: 'taskName',
    headerName: 'Action',
    width: 200,
  },
  // {
  //   field: 'comments',
  //   headerName: 'Comments',
  //   width: 200,
  // },
  {
    field: 'userFirstName',
    headerName: 'First Name',
    width: 100,
  },
  {
    field: 'userMiddleName',
    headerName: 'Middle Name',
    width: 100,
  },
  {
    field: 'userLastName',
    headerName: 'Last Name',
    width: 100,
  },
  {
    field: 'userEmployeeId',
    headerName: 'Employee Id',
    width: 100,
  },
  {
    field: 'userEmailId',
    headerName: 'Email ID',
    width: 300,
  },
]
