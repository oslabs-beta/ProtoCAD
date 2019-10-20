export interface ParentInt {
  name?: string,
  attributes?: {id: string},
  parent?: ParentInt,
  children?: ChildInt[]
}

export interface ComponentInt {
  name: string,
  attributes: {id: string},
  parent?: ParentInt,
  children: ChildInt[]
}

export interface ChildInt {
  name: string,
  attributes: {id: string},
  parent?: ParentInt,
  children: ChildInt[]
}
