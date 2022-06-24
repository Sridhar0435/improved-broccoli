import { Avatar } from '@material-ui/core'
import { blue, purple, red } from '@material-ui/core/colors'
import NotificationsIcon from '@material-ui/icons/Notifications'
import WarningIcon from '@material-ui/icons/Warning'
import BlockIcon from '@material-ui/icons/Block'
import BackupIcon from '@material-ui/icons/Backup'
import LabelImportantIcon from '@material-ui/icons/LabelImportant'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import { pendingActionDetails } from '../sections/PendingAction/tableHeader'
import { inprogressTaskDetails } from '../sections/InprogressTask/tableHeader'
import { groupPendingActionDetails } from '../sections/GroupPendingAction/tableHeaders'

export const notifications = [
  {
    title: 'Product Portal',
    description:
      '5 New Lines submitted by the supplier. Pending for your approval',
    icon: (
      <Avatar>
        <NotificationsIcon style={{ color: blue[500] }} />
      </Avatar>
    ),
  },
  {
    title: 'Promotion and Funding',
    description: 'Finance has asked clarification on the Request : 123',
    icon: (
      <Avatar>
        <NotificationsIcon style={{ color: blue[500] }} />
      </Avatar>
    ),
  },
  {
    title: 'Product Portal',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, quam.',
    icon: (
      <Avatar>
        <NotificationsIcon style={{ color: blue[500] }} />
      </Avatar>
    ),
  },
  {
    title: 'Product Portal',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, quam.',
    icon: (
      <Avatar>
        <WarningIcon style={{ color: purple[500] }} />
      </Avatar>
    ),
  },
  {
    title: 'Supplier Portal',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, quam.',
    icon: (
      <Avatar>
        <WarningIcon style={{ color: purple[500] }} />
      </Avatar>
    ),
  },
  {
    title: 'Supplier Portal',
    description:
      'Supplier set up has been completed successfully for Happy Life Plc and is ready for transactions',
    icon: (
      <Avatar>
        <NotificationsIcon style={{ color: blue[500] }} />
      </Avatar>
    ),
  },
  {
    title: 'Product Portal',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, illo?',
    icon: (
      <Avatar>
        <NotificationsIcon style={{ color: blue[500] }} />
      </Avatar>
    ),
  },
]

export const notifications2 = [
  {
    title: 'Service Portal',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, quae?',
    icon: (
      <Avatar>
        <BlockIcon style={{ color: red[500] }} />
      </Avatar>
    ),
  },
  {
    title: 'User Analytics',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea natus facere veritatis.',
    icon: (
      <Avatar>
        <WarningIcon style={{ color: purple[500] }} />
      </Avatar>
    ),
  },
  {
    title: 'Price Portal',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, quam.',
    icon: (
      <Avatar>
        <NotificationsIcon style={{ color: blue[500] }} />
      </Avatar>
    ),
  },
  {
    title: 'Product Portal',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, quam.',
    icon: (
      <Avatar>
        <WarningIcon style={{ color: purple[500] }} />
      </Avatar>
    ),
  },
  {
    title: 'Supplier Portal',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, quam.',
    icon: (
      <Avatar>
        <WarningIcon style={{ color: purple[500] }} />
      </Avatar>
    ),
  },
  {
    title: 'Store Portal',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur tempore quam repellat commodi?',
    icon: (
      <Avatar>
        <BackupIcon style={{ color: blue[500] }} />
      </Avatar>
    ),
  },
  {
    title: 'Product Portal',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, illo?',
    icon: (
      <Avatar>
        <NotificationsIcon style={{ color: blue[500] }} />
      </Avatar>
    ),
  },
]

export const commercialdash = [
  {
    title: 'Dashboard',
    url: '/Commercial/dashboard',
    more: [],
  },
  {
    title: 'Tasklists',
    url: '#',
    more: [
      {
        title: 'Promotions & Funding',
        url: '/Commercial/promotions',
      },
      {
        title: 'Retail Price Change',
        url: '/Commercial/retail',
      },
      {
        title: 'Range Amendment',
        url: '/Commercial/range',
      },
      {
        title: 'Product Portal',
        url: '/Commercial/product',
      },
      {
        title: 'Supplier Portal',
        url: '/Commercial/supplier',
      },
    ],
  },
  {
    title: 'KPI Analytics',
    url: '/Commercial/analytics',
    more: [],
  },
]

export const commercialtask = [
  {
    title: 'Promotions & Funding',
    url: '/Commercial/promotions',
  },
  {
    title: 'Retail Price Change',
    url: '/Commercial/retail',
  },
  {
    title: 'Range Amendment',
    url: '/Commercial/range',
  },
  {
    title: 'Product Portal',
    url: '/Commercial/product',
  },
  {
    title: 'Supplier Portal',
    url: '/Commercial/supplier',
  },
]

export const userconfig = [
  {
    title: 'Create User',
    url: '/userconfig/usercreate',
  },
  {
    title: 'Manage User',
    url: '/userconfig/usermanage',
  },
  {
    title: 'User Manage Group',
    url: '/userconfig/usergroup',
  },
]

export const userTaskDashboard = [
  {
    title: 'User Management',
    my: {
      pendingActions: pendingActionDetails.length,
      inProgressTask: inprogressTaskDetails.length,
    },
    myGroup: {
      pendingActions: groupPendingActionDetails.length,
      inProgressTask: pendingActionDetails.length,
    },
  },
  {
    title: 'Range Change Management',
    my: {
      pendingActions: 2,
      inProgressTask: 3,
    },
    myGroup: {
      pendingActions: 7,
      inProgressTask: 15,
    },
  },
  {
    title: 'Promotion & Funding',
    my: {
      pendingActions: 2,
      inProgressTask: 3,
    },
    myGroup: {
      pendingActions: 7,
      inProgressTask: 15,
    },
  },
  {
    title: 'Product Portal',
    my: {
      pendingActions: 2,
      inProgressTask: 3,
    },
    myGroup: {
      pendingActions: 7,
      inProgressTask: 15,
    },
  },
]

export const dashboard = [
  {
    title: 'Promotion & Funding',
    statuscomplete: 'Onetime Completion in last 3 months',
    statuscompleteval: '90%',
    reworkcomplete: 'Reworks in last 3 months',
    reworkcompleteval: '15%',
    data: [
      {
        data: 'Actions Pending with you',
        value: '3',
      },
      {
        data: 'Actions Pending with your group',
        value: '7',
      },
      {
        data: 'Unassigned workflows in your group',
        value: '5',
      },
      {
        data: 'In Progress workflows initiated by you',
        value: '12',
      },
    ],
    icon: <LabelImportantIcon style={{ color: 'white' }} />,
  },
  {
    title: 'Retail Price Change',
    statuscomplete: 'Onetime Completion in last 3 months',
    statuscompleteval: '92%',
    reworkcomplete: 'Reworks in last 3 months',
    reworkcompleteval: '05%',
    data: [
      {
        data: 'Actions Pending with you',
        value: '2',
      },
      {
        data: 'Actions Pending with your group',
        value: '5',
      },
      {
        data: 'Unassigned workflows in your group',
        value: '5',
      },
      {
        data: 'In Progress workflows initiated by you',
        value: '0',
      },
    ],
    icon: <LabelImportantIcon style={{ color: 'white' }} />,
  },
  {
    title: 'Range Amendment',
    statuscomplete: 'Onetime Completion in last 3 months',
    statuscompleteval: '85%',
    reworkcomplete: 'Reworks in last 3 months',
    reworkcompleteval: '05%',
    data: [
      {
        data: 'Actions Pending with you',
        value: '2',
      },
      {
        data: 'Actions Pending with your group',
        value: '2',
      },
      {
        data: 'Unassigned workflows in your group',
        value: '0',
      },
      {
        data: 'In Progress workflows initiated by you',
        value: '2',
      },
    ],
    icon: <LabelImportantIcon style={{ color: 'white' }} />,
  },
  {
    title: 'Product Portal',
    statuscomplete: 'Onetime Completion in last 3 months',
    statuscompleteval: '75%',
    reworkcomplete: 'Reworks in last 3 months',
    reworkcompleteval: '22%',
    data: [
      {
        data: 'Actions Pending with you',
        value: '15',
      },
      {
        data: 'Actions Pending with your group',
        value: '21',
      },
      {
        data: 'Unassigned workflows in your group',
        value: '7',
      },
      {
        data: 'In Progress workflows initiated by you',
        value: '25',
      },
    ],
    icon: <LabelImportantIcon style={{ color: 'white' }} />,
  },
  {
    title: 'Supplier Portal',
    statuscomplete: 'Onetime Completion in last 3 months',
    statuscompleteval: '90%',
    reworkcomplete: 'Reworks in last 3 months',
    reworkcompleteval: '15%',
    data: [
      {
        data: 'Actions Pending with you',
        value: '3',
      },
      {
        data: 'Actions Pending with your group',
        value: '7',
      },
      {
        data: 'Unassigned workflows in your group',
        value: '5',
      },
      {
        data: 'In Progress workflows initiated by you',
        value: '12',
      },
    ],
    icon: <LabelImportantIcon style={{ color: 'white' }} />,
  },
  {
    title: 'Price Portal',
    statuscomplete: 'Onetime Completion in last 3 months',
    statuscompleteval: '70%',
    reworkcomplete: 'Reworks in last 3 months',
    reworkcompleteval: '30%',
    data: [
      {
        data: 'Actions Pending with you',
        value: '3',
      },
      {
        data: 'Actions Pending with your group',
        value: '7',
      },
      {
        data: 'Unassigned workflows in your group',
        value: '5',
      },
      {
        data: 'In Progress workflows initiated by you',
        value: '12',
      },
    ],
    icon: <LabelImportantIcon style={{ color: 'white' }} />,
  },
]

export const promotions = [
  {
    id: 345564,
    subprocess: 'Create Simple Promotion',
    decription: 'Create Simple Promotion',
    createdate: '26-Feb-2021 9:45 AM',
    lastupdatedate: '26-Feb-2021 9:45 AM',
    status: 'In Progress',
    logs: 'Open',
    attachments: <AttachFileIcon />,
    action: 'Open',
  },
  {
    id: 345566,
    subprocess: 'Create Multibuy Promotion',
    decription: 'Meal Deal Promotion',
    createdate: '23-Feb-2021 11:45 AM',
    lastupdatedate: '23-Feb-2021 11:45 AM',
    status: 'In Progress',
    logs: 'Open',
    attachments: '',
    action: 'Open',
  },
  {
    id: 345598,
    subprocess: 'Modify Promotion',
    decription: 'Mothers Day Event update',
    createdate: '22-Feb-2021 3:23 PM',
    lastupdatedate: '22-Feb-2021 3:23 PM',
    status: 'In Progress',
    logs: 'Open',
    attachments: <AttachFileIcon />,
    action: 'Open',
  },
  {
    id: 345500,
    subprocess: 'Create Simple Coupon',
    decription: 'Create Simple Coupon',
    createdate: '26-Mar-2021 9:45 AM',
    lastupdatedate: '26-Mar-2021 9:45 AM',
    status: 'In Progress',
    logs: 'Open',
    attachments: <AttachFileIcon />,
    action: 'Open',
  },
  {
    id: 445564,
    subprocess: 'Create Simple Deal',
    decription: 'Bumper Super Deal',
    createdate: '26-Apr-2021 9:45 AM',
    lastupdatedate: '26-Apr-2021 9:45 AM',
    status: 'In Progress',
    logs: 'Open',
    attachments: '',
    action: 'Open',
  },
  {
    id: 345564,
    subprocess: 'Create Complex Promotion',
    decription: 'Create Complex Promotion',
    createdate: '26-Feb-2020 9:45 AM',
    lastupdatedate: '26-Feb-2020 9:45 AM',
    status: 'In Progress',
    logs: 'Open',
    attachments: <AttachFileIcon />,
    action: 'Open',
  },
  {
    id: 345564,
    subprocess: 'Create Simple Supplier Chain',
    decription: 'Create Simple Supplier Chain',
    createdate: '26-Feb-2021 10:45 AM',
    lastupdatedate: '26-Feb-2021 10:45 AM',
    status: 'In Progress',
    logs: 'Open',
    attachments: '',
    action: 'Open',
  },
  {
    id: 545564,
    subprocess: 'Lorem ipsum dolor sit amet.',
    decription: 'Lorem ipsum dolor sit amet consectetur.',
    createdate: '16-Feb-2021 9:45 AM',
    lastupdatedate: '16-Feb-2021 9:45 AM',
    status: 'In Progress',
    logs: 'Open',
    attachments: <AttachFileIcon />,
    action: 'Open',
  },
]
export const requestTypes = [
  {
    name: 'New',
    text: 'New',
  },
  {
    name: 'Modify',
    text: 'Modify',
  },
  {
    name: 'Remove',
    text: 'Remove',
  },
]
export const statuses = [
  {
    statusID: 'A',
    text: 'ACTIVE',
  },
  {
    statusID: 'W',
    text: 'INPROGRESS',
  },
  {
    statusID: 'I',
    text: 'INACTIVE',
  },
  {
    statusID: 'D',
    text: 'DELETED',
  },
]
export const groupstatuses = [
  {
    statusID: 'A',
    text: 'ACTIVE',
  },
  {
    statusID: 'I',
    text: 'INACTIVE',
  },
  {
    statusID: 'D',
    text: 'DELETED',
  },
]
export interface RoleTypes {
  readonly value: string
  readonly label: string
  readonly check: boolean
}

export const roleTypes: RoleTypes[] = [
  {
    value: 'role1',
    label: 'Role 1',
    check: false,
  },
  {
    value: 'role2',
    label: 'Role 2',
    check: false,
  },
  {
    value: 'role3',
    label: 'Role 3',
    check: false,
  },
  {
    value: 'role4',
    label: 'Role 4',
    check: false,
  },
  {
    value: 'role5',
    label: 'Role 5',
    check: false,
  },
]
export interface GroupTypes {
  readonly value: string
  readonly label: string
}

export const groupTypes: GroupTypes[] = [
  {
    value: 'group1',
    label: 'Group 1',
  },
  {
    value: 'group2',
    label: 'Group 2',
  },
  {
    value: 'group3',
    label: 'Group 3',
  },
  {
    value: 'group4',
    label: 'Group 4',
  },
  {
    value: 'group5',
    label: 'Group 5',
  },
  {
    value: 'group6',
    label: 'Group 6',
  },
  {
    value: 'group7',
    label: 'Group 7',
  },
  {
    value: 'group8',
    label: 'Group 8',
  },

  {
    value: 'group9',
    label: 'Group 9',
  },
  {
    value: 'group10',
    label: 'Group 10',
  },
  {
    value: 'group11',
    label: 'Group 11',
  },
  {
    value: 'group12',
    label: 'Group 12',
  },
]
export interface ProducthierarchyTypes {
  readonly value: string
  readonly label: string
}
export const producthierarchyTypes: ProducthierarchyTypes[] = [
  {
    value: 'producthierarchy1',
    label: 'Product Hierarchy 1',
  },
  {
    value: 'producthierarchy2',
    label: 'Product Hierarchy 2',
  },
  {
    value: 'producthierarchy3',
    label: 'Product Hierarchy 3',
  },
  {
    value: 'producthierarchy4',
    label: 'Product Hierarchy 4',
  },
  {
    value: 'producthierarchy5',
    label: 'Product Hierarchy 5',
  },
  {
    value: 'producthierarchy6',
    label: 'Product Hierarchy 6',
  },
  {
    value: 'producthierarchy7',
    label: 'Product Hierarchy 7',
  },
  {
    value: 'producthierarchy8',
    label: 'Product Hierarchy 8',
  },

  {
    value: 'producthierarchy9',
    label: 'Product Hierarchy 9',
  },
  {
    value: 'producthierarchy10',
    label: 'Product Hierarchy 10',
  },
  {
    value: 'producthierarchy11',
    label: 'Product Hierarchy 11',
  },
  {
    value: 'producthierarchy12',
    label: 'Product Hierarchy 12',
  },
]
export interface LocationhierarchyTypes {
  readonly value: string
  readonly label: string
  readonly hierarchyLevel: string
  readonly hierarchyId: string
  readonly startDate: string
  readonly endDate: string
}
export const locationTypes: LocationhierarchyTypes[] = [
  {
    value: 'Online',
    label: 'Online',
    hierarchyLevel: 'channel',
    hierarchyId: 'Online',
    startDate: '2021-12-10',
    endDate: '2099-12-31',
  },
  {
    value: 'Wholesale',
    label: 'Wholesale',
    hierarchyLevel: 'channel',
    hierarchyId: 'Wholesale',
    startDate: '2021-12-16',
    endDate: '2099-01-01',
  },
  {
    value: 'Retail',
    label: 'Retail',
    hierarchyLevel: 'channel',
    hierarchyId: 'Retail',
    startDate: '2021-12-16',
    endDate: '2099-01-01',
  },
]
export const employeeDetails = [
  {
    label: '123',
    empID: 123,
    firstName: 'ajay',
    middleName: 'k',
    lastName: 's',
    email: 'ajay@123.com',
    designation: 'manager',
    status: 'active',
  },
  {
    label: '234',
    empID: 234,
    firstName: 'sourav',
    middleName: '',
    lastName: 'das',
    email: 'sourav.das@234.com',
    designation: 'staff',
    status: 'active',
  },
  {
    label: '345',
    empID: 345,
    firstName: 'soumyadeep',
    middleName: '',
    lastName: 'halder',
    email: 'soumyadeep@345.com',
    designation: 'developer',
    status: 'inactive',
  },
  {
    label: '456',
    empID: 456,
    firstName: 'omit',
    middleName: 'kumar',
    lastName: 'singh',
    email: 'omitkumar@456.com',
    designation: 'clerk',
    status: 'on-call',
  },
]
export const userData = [
  {
    user: {
      userId: '40011200',
      firstName: 'test',
      middleName: '123',
      lastName: 'test',
      emailId: 'sample.testsit@test.morrisonsplc.co.uk',
      additionalInfo: 'BUYER',
      designation: 'null',
      status: 'A',
    },
    roles: [
      {
        roleId: 'ADMIN',
      },
      {
        roleId: 'BUYER',
      },
    ],
    usergroups: [
      {
        groupId: '10005',
        status: 'A',
      },
    ],
  },
  {
    user: {
      userId: '40011368',
      firstName: 'Admin',
      middleName: 'sit',
      lastName: 'test',
      emailId: 'admin.testsit@test.morrisonsplc.co.uk',
      additionalInfo: 'ADMIN',
      designation: 'null',
      status: 'A',
    },
    roles: [
      {
        roleId: 'ADMIN',
      },
    ],
    usergroups: [
      {
        groupId: '10004',
        status: 'A',
      },
    ],
  },
  {
    user: {
      userId: '40011367',
      firstName: 'Buyer',
      middleName: 'sit',
      lastName: 'test',
      emailId: 'buyer.testsit@test.morrisonsplc.co.uk',
      additionalInfo: 'BUYER',
      designation: 'null',
      status: 'I',
    },
    roles: [
      {
        roleId: 'BUYER',
      },
    ],
    usergroups: [
      {
        groupId: '10005',
        status: 'A',
      },
    ],
  },
  {
    user: {
      userId: '40011366',
      firstName: 'Seller',
      middleName: 'sit',
      lastName: 'test',
      emailId: 'seller.testsit@test.morrisonsplc.co.uk',
      additionalInfo: 'SELLER',
      designation: 'null',
      status: 'A',
    },
    roles: [
      {
        roleId: 'SCSPL',
      },
    ],
    usergroups: [
      {
        groupId: '10006',
        status: 'A',
      },
    ],
  },
  {
    user: {
      userId: '40011365',
      firstName: 'Merchant',
      middleName: 'sit',
      lastName: 'test',
      emailId: 'merchant.testsit@test.morrisonsplc.co.uk',
      additionalInfo: 'MERCHANT',
      designation: 'null',
      status: 'A',
    },
    roles: [
      {
        roleId: 'MERCH',
      },
    ],
    usergroups: [
      {
        groupId: '10007',
        status: 'A',
      },
    ],
  },
]
export const viewLogColumns = [
  { field: 'timestamp', headerName: 'Timestamp', width: 150 },
  { field: 'userID', headerName: 'User ID', width: 80 },
  { field: 'role', headerName: 'Role', width: 70 },
  { field: 'action', headerName: 'Action', width: 70 },
  {
    field: 'attachment',
    headerName: 'Attachment',
    type: 'file',
    width: 80,
  },
  { field: 'comments', headerName: 'Comments', width: 90 },
]
export const viewHierarchy = [
  { field: 'hierarchyId', headerName: 'Hierarchy Id', width: 150 },
  { field: 'hierarchyLevel', headerName: 'Hierarchy Level', width: 80 },
  { field: 'startDate', headerName: 'Start Date', width: 70 },
  { field: 'endDate', headerName: 'End Date', width: 70 },
]
export const userTableHeaders = [
  {
    field: 'userId',
    headerName: 'Employee ID',
    width: 150,
  },
  {
    field: 'firstName',
    headerName: 'First Name',
    width: 150,
  },
  {
    field: 'middleName',
    headerName: 'Middle Name',
    width: 150,
  },
  {
    field: 'lastName',
    headerName: 'Last Name',
    width: 150,
  },
  {
    field: 'emailId',
    headerName: 'Email ID',
    width: 300,
  },
  {
    field: 'designation',
    headerName: 'Designation',
    width: 150,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 100,
  },
  {
    field: 'roles',
    headerName: 'Role',
    width: 150,
  },
  {
    field: 'usergroups',
    headerName: 'Group',
    width: 150,
  },
  {
    field: 'additionalInfo',
    headerName: 'AdditionalInfo',
    width: 200,
  },
]
export const userDetails = [
  {
    empID: 297,
    firstName: 'Greer',
    middleName: 'Anna',
    lastName: 'Frost',
    email: 'valeriemayo@proflex.com',
    designation: 'Designer',
    status: 'Away',
    comments: 'Bad',
  },
  {
    empID: 668,
    firstName: 'Huffman',
    middleName: 'Brianna',
    lastName: 'Kirk',
    email: 'maddoxguthrie@atomica.com',
    designation: 'Architect',
    status: 'Away',
    comments: 'Bad',
  },
  {
    empID: 362,
    firstName: 'Kerri',
    middleName: 'Ratliff',
    lastName: 'Pearson',
    email: 'maimedina@earthplex.com',
    designation: 'Engineer',
    status: 'On-Leave',
    comments: 'Comments',
  },
  {
    empID: 776,
    firstName: 'Chasity',
    middleName: 'Matilda',
    lastName: 'Doyle',
    email: 'juliepuckett@optique.com',
    designation: 'Engineer',
    status: 'Away',
    comments: 'No Comments',
  },
  {
    empID: 952,
    firstName: 'Gayle',
    middleName: 'Gallegos',
    lastName: 'Rutledge',
    email: 'summersmiranda@orbin.com',
    designation: 'Engineer',
    status: 'Active',
    comments: 'Bad',
  },
  {
    empID: 233,
    firstName: 'Dotson',
    middleName: 'Stephenson',
    lastName: 'Gilmore',
    email: 'juliannecrosby@sonique.com',
    designation: 'Architect',
    status: 'Busy',
    comments: 'Good',
  },
  {
    empID: 405,
    firstName: 'Ann',
    middleName: 'Suzette',
    lastName: 'Sparks',
    email: 'nixonforbes@homelux.com',
    designation: 'Developer',
    status: 'Busy',
    comments: 'Good',
  },
  {
    empID: 842,
    firstName: 'Natalie',
    middleName: 'Tammy',
    lastName: 'Galloway',
    email: 'littlecoffey@quantalia.com',
    designation: 'Manager',
    status: 'On-Leave',
    comments: 'Good',
  },
  {
    empID: 534,
    firstName: 'Marina',
    middleName: 'Johnson',
    lastName: 'Bowen',
    email: 'norriscombs@cognicode.com',
    designation: 'Engineer',
    status: 'Away',
    comments: 'Good',
  },
  {
    empID: 474,
    firstName: 'Sullivan',
    middleName: 'Dale',
    lastName: 'Valenzuela',
    email: 'maribelburks@enersol.com',
    designation: 'Designer',
    status: 'Active',
    comments: 'Good',
  },
  {
    empID: 640,
    firstName: 'Sears',
    middleName: 'Bender',
    lastName: 'Scott',
    email: 'sharpburris@zilphur.com',
    designation: 'Architect',
    status: 'On-Call',
    comments: 'No Comments',
  },
  {
    empID: 698,
    firstName: 'Katrina',
    middleName: 'Peters',
    lastName: 'Wheeler',
    email: 'altawatson@kidgrease.com',
    designation: 'Developer',
    status: 'On-Call',
    comments: 'No Comments',
  },
  {
    empID: 150,
    firstName: 'Josefina',
    middleName: 'Strong',
    lastName: 'Page',
    email: 'elsierandolph@skinserve.com',
    designation: 'Developer',
    status: 'Busy',
    comments: 'Comments',
  },
  {
    empID: 830,
    firstName: 'Lesley',
    middleName: 'Mildred',
    lastName: 'Brown',
    email: 'cynthialeblanc@austech.com',
    designation: 'Designer',
    status: 'On-Call',
    comments: 'Bad',
  },
  {
    empID: 754,
    firstName: 'Etta',
    middleName: 'Morales',
    lastName: 'Marsh',
    email: 'charlenerosales@zilladyne.com',
    designation: 'Designer',
    status: 'Busy',
    comments: 'Good',
  },
]
export const viewLogRows = [
  {
    timestamp: '15-09-21 11:45',
    userID: 133456,
    role: 'Role 0',
    action: 'Action 0',
    //attachment: <Link to="D:/upload/test_docs/Pan_card.pdf"> <AttachFileIcon /> </Link>,
    attachment: <AttachFileIcon />,
    comments: 'Some Comments',
  },
  {
    timestamp: '15-09-21 11:45',
    userID: 123456,
    role: 'Role 1',
    action: 'Action 1',
    attachment: <AttachFileIcon />,
    comments: 'Some Comments',
  },
  {
    timestamp: '15-09-21 11:45',
    userID: 123457,
    role: 'Role 2',
    action: 'Action 2',
    attachment: <AttachFileIcon />,
    comments: 'Some Comments',
  },
  {
    timestamp: '15-09-21 11:45',
    userID: 123458,
    role: 'Role 3',
    action: 'Action 3',
    attachment: <AttachFileIcon />,
    comments: 'Some Comments',
  },
  {
    timestamp: '15-09-21 11:45',
    userID: 123459,
    role: 'Role 4',
    action: 'Action 4',
    attachment: <AttachFileIcon />,
    comments: 'Some Comments',
  },
  {
    timestamp: '15-09-21 11:45',
    userID: 111111,
    role: 'Role 5',
    action: 'Action 5',
    attachment: '',
    comments: 'Some Comments',
  },
  {
    timestamp: '15-09-21 11:45',
    userID: 111112,
    role: 'Role 6',
    action: 'Action 6',
    attachment: '',
    comments: 'Some Comments',
  },
  {
    timestamp: '15-09-21 11:45',
    userID: 111113,
    role: 'Role 7',
    action: 'Action 7',
    attachment: '',
    comments: 'Some Comments',
  },
  {
    timestamp: '15-09-21 11:45',
    userID: 111114,
    role: 'Role 8',
    action: 'Action 8',
    attachment: '',
    comments: 'Some Comments',
  },
  {
    timestamp: '15-09-21 11:45',
    userID: 111115,
    role: 'Role 9',
    action: 'Action 9',
    attachment: '',
    comments: 'Some Comments',
  },
  {
    timestamp: '15-09-21 11:45',
    userID: 111116,
    role: 'Role 10',
    action: 'Action 10',
    attachment: '',
    comments: 'Some Comments',
  },
  {
    timestamp: '15-09-21 11:45',
    userID: 111117,
    role: 'Role 11',
    action: 'Action 11',
    attachment: '',
    comments: 'Some Comments',
  },
  {
    timestamp: '15-09-21 11:45',
    userID: 111118,
    role: 'Role 12',
    action: 'Action 12',
    attachment: '',
    comments: 'Some Comments',
  },
  {
    timestamp: '15-09-21 11:45',
    userID: 111119,
    role: 'Role 13',
    action: 'Action 13',
    attachment: '',
    comments: 'Some Comments',
  },
  {
    timestamp: '15-09-21 11:45',
    userID: 111120,
    role: 'Role 14',
    action: 'Action 14',
    attachment: '',
    comments: 'Some Comments',
  },
  {
    timestamp: '15-09-21 11:45',
    userID: 111121,
    role: 'Role 15',
    action: 'Action 15',
    attachment: '',
    comments: 'Some Comments',
  },
  {
    timestamp: '15-09-21 11:45',
    userID: 111122,
    role: 'Role 16',
    action: 'Action 16',
    attachment: '',
    comments: 'Some Comments',
  },
]
export const userGroupTableHeaders = [
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
    width: 80,
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
]
export const taskList = [
  {
    value: 'task1',
    label: 'Task 1',
    count: 1,
  },
  {
    value: 'task2',
    label: 'Task 2',
    count: 2,
  },
  {
    value: 'task3',
    label: 'Task 3',
    count: 3,
  },
  {
    value: 'task4',
    label: 'Task 4',
    count: 4,
  },
]
export const userGroupDetails = [
  {
    groupID: 12356,
    groupName: 'Group name 1',
    description: 'Some description to be described here',
    status: 'active',
    productHierarchy: 'view',
    locationHierarchy: 'view',
  },
  {
    groupID: 12356,
    groupName: 'Group name 1',
    description: 'Some description to be described here',
    status: 'active',
    productHierarchy: 'view',
    locationHierarchy: 'view',
  },
  {
    groupID: 12356,
    groupName: 'Group name 1',
    description: 'Some description to be described here',
    status: 'active',
    productHierarchy: 'view',
    locationHierarchy: 'view',
  },
  {
    groupID: 12356,
    groupName: 'Group name 1',
    description: 'Some description to be described here',
    status: 'active',
    productHierarchy: 'view',
    locationHierarchy: 'view',
  },
  {
    groupID: 12356,
    groupName: 'Group name 1',
    description: 'Some description to be described here',
    status: 'active',
    productHierarchy: 'view',
    locationHierarchy: 'view',
  },
  {
    groupID: 12356,
    groupName: 'Group name 1',
    description: 'Some description to be described here',
    status: 'active',
    productHierarchy: 'view',
    locationHierarchy: 'view',
  },
  {
    groupID: 12356,
    groupName: 'Group name 1',
    description: 'Some description to be described here',
    status: 'active',
    productHierarchy: 'view',
    locationHierarchy: 'view',
  },
  {
    groupID: 12356,
    groupName: 'Group name 1',
    description: 'Some description to be described here',
    status: 'active',
    productHierarchy: 'view',
    locationHierarchy: 'view',
  },
  {
    groupID: 12356,
    groupName: 'Group name 1',
    description: 'Some description to be described here',
    status: 'active',
    productHierarchy: 'view',
    locationHierarchy: 'view',
  },
  {
    groupID: 12356,
    groupName: 'Group name 1',
    description: 'Some description to be described here',
    status: 'active',
    productHierarchy: 'view',
    locationHierarchy: 'view',
  },
]

export const pendingStatusDetails = {
  userId: '40114362',
  status: [
    {
      details: 'myCompletedTasks',
      count: '5',
      tasks: [
        {
          requestId: 'string',
          assignedToUserId: 'string',
          assignedToGroupId: 'string',
          assignedTimeStamp: 'string',
          taskId: 'string',
          taskName: 'string',
          requestorFullname: 'string',
          requestorRole: 'string',
          comments: 'string',
          userFirstName: 'string',
          userMiddleName: 'string',
          userLastName: 'string',
          userEmployeeId: 'string',
          userEmailId: 'string',
        },
      ],
    },
    {
      details: 'myPendingTasks',
      count: '2',
      tasks: [
        {
          requestId: '01234',
          assignedToUserId: '2345',
          assignedToGroupId: '1004',
          assignedTimeStamp: '2022-01-07',
          taskId: '01234',
          taskName: 'pending',
          requestorFullname: 'Lobo',
          requestorRole: 'role 1',
          comments: 'reassign',
          userFirstName: 'Mark',
          userMiddleName: '',
          userLastName: 'mark',
          userEmployeeId: '3456',
          userEmailId: 'mark@morrisonsplc.co.uk',
        },
        {
          requestId: '01235',
          assignedToUserId: '2346',
          assignedToGroupId: '1004',
          assignedTimeStamp: '2022-01-07',
          taskId: '01235',
          taskName: 'pending',
          requestorFullname: 'Lobo',
          requestorRole: 'role 1',
          comments: 'reassign',
          userFirstName: 'Mark',
          userMiddleName: '',
          userLastName: 'mark',
          userEmployeeId: '3456',
          userEmailId: 'mark@morrisonsplc.co.uk',
        },
      ],
    },
    {
      details: 'myRequestedTasks',
      count: '1',
      tasks: [
        {
          requestId: '01234',
          assignedToUserId: '2345',
          assignedToGroupId: '1004',
          assignedTimeStamp: '2022-01-07',
          taskId: '01234',
          taskName: 'pending',
          requestorFullname: 'Lobo',
          requestorRole: 'role 1',
          comments: 'reassign',
          userFirstName: 'Mark',
          userMiddleName: '',
          userLastName: 'mark',
          userEmployeeId: '3456',
          userEmailId: 'mark@morrisonsplc.co.uk',
        },
      ],
    },
    {
      details: 'myGroupPendingTasks',
      count: '3',
      tasks: [
        {
          requestId: '01234',
          assignedToUserId: '2345',
          assignedToGroupId: '1004',
          assignedTimeStamp: '2022-01-07',
          taskId: '01234',
          taskName: 'pending',
          requestorFullname: 'Lobo',
          requestorRole: 'role 1',
          comments: 'reassign',
          userFirstName: 'Mark',
          userMiddleName: '',
          userLastName: 'mark',
          userEmployeeId: '3456',
          userEmailId: 'mark@morrisonsplc.co.uk',
        },
        {
          requestId: '01234',
          assignedToUserId: '2345',
          assignedToGroupId: '1004',
          assignedTimeStamp: '2022-01-07',
          taskId: '01234',
          taskName: 'pending',
          requestorFullname: 'Lobo',
          requestorRole: 'role 1',
          comments: 'reassign',
          userFirstName: 'Mark',
          userMiddleName: '',
          userLastName: 'mark',
          userEmployeeId: '3456',
          userEmailId: 'mark@morrisonsplc.co.uk',
        },
        {
          requestId: '01234',
          assignedToUserId: '2345',
          assignedToGroupId: '1004',
          assignedTimeStamp: '2022-01-07',
          taskId: '01234',
          taskName: 'pending',
          requestorFullname: 'Lobo',
          requestorRole: 'role 1',
          comments: 'reassign',
          userFirstName: 'Mark',
          userMiddleName: '',
          userLastName: 'mark',
          userEmployeeId: '3456',
          userEmailId: 'mark@morrisonsplc.co.uk',
        },
      ],
    },
    {
      details: 'myGroupUnnassignedTasks',
      count: '2',
      tasks: [
        {
          requestId: '01234',
          assignedToUserId: '2345',
          assignedToGroupId: '1004',
          assignedTimeStamp: '2022-01-07',
          taskId: '01234',
          taskName: 'pending',
          requestorFullname: 'Lobo',
          requestorRole: 'role 1',
          comments: 'reassign',
          userFirstName: 'Mark',
          userMiddleName: '',
          userLastName: 'mark',
          userEmployeeId: '3456',
          userEmailId: 'mark@morrisonsplc.co.uk',
        },
        {
          requestId: '01234',
          assignedToUserId: '2345',
          assignedToGroupId: '1004',
          assignedTimeStamp: '2022-01-07',
          taskId: '01234',
          taskName: 'pending',
          requestorFullname: 'Lobo',
          requestorRole: 'role 1',
          comments: 'reassign',
          userFirstName: 'Mark',
          userMiddleName: '',
          userLastName: 'mark',
          userEmployeeId: '3456',
          userEmailId: 'mark@morrisonsplc.co.uk',
        },
      ],
    },
  ],
}
