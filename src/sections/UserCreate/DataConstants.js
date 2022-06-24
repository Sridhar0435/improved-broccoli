import AttachFileIcon from '@material-ui/icons/AttachFile'
export const constants = {
  viewLogRows: [
    {
      timestamp: '15-09-21 11:45',
      userId: 133456,
      role: 'Role 0',
      action: 'Action 0',
      attachment: <AttachFileIcon />,
      comments: 'Some Comments',
    },
    {
      timestamp: '15-09-21 11:45',
      userId: 123456,
      role: 'Role 1',
      action: 'Action 1',
      attachment: <AttachFileIcon />,
      comments: 'Some Comments',
    },
    {
      timestamp: '15-09-21 11:45',
      userId: 123457,
      role: 'Role 2',
      action: 'Action 2',
      attachment: <AttachFileIcon />,
      comments: 'Some Comments',
    },
    {
      timestamp: '15-09-21 11:45',
      userId: 123458,
      role: 'Role 3',
      action: 'Action 3',
      attachment: <AttachFileIcon />,
      comments: 'Some Comments',
    },
    {
      timestamp: '15-09-21 11:45',
      userId: 123459,
      role: 'Role 4',
      action: 'Action 4',
      attachment: <AttachFileIcon />,
      comments: 'Some Comments',
    },
    {
      timestamp: '15-09-21 11:45',
      userId: 111111,
      role: 'Role 5',
      action: 'Action 5',
      attachment: '',
      comments: 'Some Comments',
    },
    {
      timestamp: '15-09-21 11:45',
      userId: 111112,
      role: 'Role 6',
      action: 'Action 6',
      attachment: '',
      comments: 'Some Comments',
    },
    {
      timestamp: '15-09-21 11:45',
      userId: 111113,
      role: 'Role 7',
      action: 'Action 7',
      attachment: '',
      comments: 'Some Comments',
    },
    {
      timestamp: '15-09-21 11:45',
      userId: 111114,
      role: 'Role 8',
      action: 'Action 8',
      attachment: '',
      comments: 'Some Comments',
    },
    {
      timestamp: '15-09-21 11:45',
      userId: 111115,
      role: 'Role 9',
      action: 'Action 9',
      attachment: '',
      comments: 'Some Comments',
    },
    {
      timestamp: '15-09-21 11:45',
      userId: 111116,
      role: 'Role 10',
      action: 'Action 10',
      attachment: '',
      comments: 'Some Comments',
    },
    {
      timestamp: '15-09-21 11:45',
      userId: 111117,
      role: 'Role 11',
      action: 'Action 11',
      attachment: '',
      comments: 'Some Comments',
    },
    {
      timestamp: '15-09-21 11:45',
      userId: 111118,
      role: 'Role 12',
      action: 'Action 12',
      attachment: '',
      comments: 'Some Comments',
    },
    {
      timestamp: '15-09-21 11:45',
      userId: 111119,
      role: 'Role 13',
      action: 'Action 13',
      attachment: '',
      comments: 'Some Comments',
    },
    {
      timestamp: '15-09-21 11:45',
      userId: 111120,
      role: 'Role 14',
      action: 'Action 14',
      attachment: '',
      comments: 'Some Comments',
    },
    {
      timestamp: '15-09-21 11:45',
      userId: 111121,
      role: 'Role 15',
      action: 'Action 15',
      attachment: '',
      comments: 'Some Comments',
    },
    {
      timestamp: '15-09-21 11:45',
      userId: 111122,
      role: 'Role 16',
      action: 'Action 16',
      attachment: '',
      comments: 'Some Comments',
    },
  ],

  viewLogColumns: [
    { field: 'timestamp', headerName: 'Timestamp', width: 120 },
    { field: 'userId', headerName: 'User ID', width: 80 },
    { field: 'role', headerName: 'Role', width: 100 },
    { field: 'actionTaken', headerName: 'Action', width: 150 },
    {
      field: 'attachmentUrl',
      headerName: 'Attachment',
      type: 'file',
      width: 200,
    },
    { field: 'comments', headerName: 'Comments', width: 200 },
  ],

  // requestTypes: [
  //   {
  //     name: 'new',
  //     text: 'Create New User',
  //   },
  //   {
  //     name: 'modify',
  //     text: 'Modify Existing User',
  //   },
  //   {
  //     name: 'remove',
  //     text: 'Remove Existing User',
  //   },
  // ],
  requestTypes: [
    {
      value: 'new',
      label: 'Create New User',
    },
    {
      value: 'modify',
      label: 'Modify Existing User',
    },
    {
      value: 'remove',
      label: 'Remove Existing User',
    },
  ],

  // statuses: [
  //   {
  //     statusID: 'A',
  //     text: 'Active',
  //   },
  //   {
  //     statusID: 'W',
  //     text: 'Inprogress',
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

  statuses: [
    {
      value: 'A',
      label: 'Active',
    },
    {
      value: 'W',
      label: 'Inprogress',
      isDisabled: true,
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

  getAdditionalInfoHeader: [
    {
      field: 'managerId',
      headerName: 'Manager Id',
      width: 100,
    },
    {
      field: 'managerName',
      headerName: 'Manager Name',
      width: 100,
    },
    {
      field: 'managersManagerId',
      headerName: "Manager's Manager Id",
      width: 100,
    },
    {
      field: 'hiringmanager',
      headerName: 'Hiring Manager',
      width: 100,
    },
    {
      field: 'leavingDate',
      headerName: 'Leaving Date',
      width: 100,
    },
    {
      field: 'businessUnit',
      headerName: 'Business Unit',
      width: 100,
    },
    {
      field: 'locationName',
      headerName: 'Location Name',
      width: 100,
    },
    {
      field: 'division',
      headerName: 'Division',
      width: 100,
    },
  ],

  getColleagueDetails: (colleague) => {
    if (colleague) {
      return [
        {
          managerId:
            colleague.lineManagerEmployeeId !== ''
              ? colleague.lineManagerEmployeeId
              : ' ',
          managerName:
            colleague.lineManagerName !== '' ? colleague.lineManagerName : ' ',
          managersManagerId:
            colleague.managersManagerEmployeeId !== ''
              ? colleague.managersManagerEmployeeId
              : ' ',
          hiringmanager:
            colleague.hiringManager !== '' ? colleague.hiringManager : ' ',
          leavingDate:
            colleague.effectiveLeaveDate !== ''
              ? colleague.effectiveLeaveDate
              : ' ',
          businessUnit:
            colleague.colleagueLocationData.businessUnit !== ''
              ? colleague.colleagueLocationData.businessUnit
              : ' ',
          locationName:
            colleague.colleagueLocationData.locationName !== ''
              ? colleague.colleagueLocationData.locationName
              : ' ',
          division:
            colleague.colleagueLocationData.division !== ''
              ? colleague.colleagueLocationData.division
              : ' ',
        },
      ]
    }
    return [
      {
        managerId: 'nocolleaguedata',
        managerName: 'nocolleaguedata',
        managersManagerId: 'nocolleaguedata',
        hiringmanager: 'nocolleaguedata',
        leavingDate: 'nocolleaguedata',
        businessUnit: 'nocolleaguedata',
        locationName: 'nocolleaguedata',
        division: 'nocolleaguedata',
      },
    ]
  },

  getAdditionalInfo: (additional) => {
    const splitted = additional.split('#!#')
    if (splitted.length > 0)
      return [
        {
          managerId: splitted[0],
          managerName: splitted[1],
          managersManagerId: splitted[2],
          hiringmanager: splitted[3],
          leavingDate: splitted[4],
          businessUnit: splitted[5],
          locationName: splitted[6],
          division: splitted[7],
        },
      ]
    else
      return [
        {
          managerId: ' ',
          managerName: ' ',
          managersManagerId: ' ',
          hiringmanager: ' ',
          leavingDate: ' ',
          businessUnit: ' ',
          locationName: ' ',
          division: ' ',
        },
      ]
  },
}
