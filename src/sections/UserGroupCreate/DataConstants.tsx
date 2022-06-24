const formattedDate = () => {
  return new Date().toISOString().split('T')[0]
}

export interface LocationhierarchyTypes {
  readonly value: string
  readonly label: string
  readonly hierarchyLevel: string
  readonly hierarchyId: string
  readonly hierarchyName: string | null
  readonly startDate: string
  readonly endDate: string
}

export const locationTypes: LocationhierarchyTypes[] = [
  {
    value: 'Online',
    label: 'Online',
    hierarchyLevel: 'channel',
    hierarchyId: 'Online',
    hierarchyName: null,
    startDate: formattedDate(),
    endDate: '2099-12-31',
  },
  {
    value: 'Wholesale',
    label: 'Wholesale',
    hierarchyLevel: 'channel',
    hierarchyId: 'Wholesale',
    hierarchyName: null,
    startDate: formattedDate(),
    endDate: '2099-01-01',
  },
  {
    value: 'Retail',
    label: 'Retail',
    hierarchyLevel: 'channel',
    hierarchyId: 'Retail',
    hierarchyName: null,
    startDate: formattedDate(),
    endDate: '2099-01-01',
  },
]

export const constants = {
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

  mainvalues: [
    { value: 'none', label: 'Select..' },
    { value: 'division', label: 'Division' },
    { value: 'group', label: 'Trading Group' },
    { value: 'category', label: 'Category' },
    { value: 'department', label: 'Product Group' },
    // { value: 'class', label: 'Class' },
    // { value: 'subclass', label: 'Sub Class' },
  ],
}
