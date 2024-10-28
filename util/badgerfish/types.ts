export type JsonValue = string | number | boolean | JsonObject | JsonObject[]

export interface JsonObject {
  [key: string]: JsonValue
}
