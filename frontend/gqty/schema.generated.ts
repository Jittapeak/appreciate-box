/**
 * GQty AUTO-GENERATED CODE: PLEASE DO NOT MODIFY MANUALLY
 */

import { type ScalarsEnumsHash } from "gqty";

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Any: { input: any; output: any };
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.This scalar is serialized to a string in ISO 8601 format and parsed from a string in ISO 8601 format. */
  DateTimeISO: { input: any; output: any };
  File: { input: any; output: any };
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any };
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: { input: any; output: any };
  /** Custom scalar that handles both integers and floats */
  Number: { input: any; output: any };
  /** Represents NULL values */
  Void: { input: any; output: any };
}

export interface AppreciateInsertInput {
  text: Scalars["String"]["input"];
  user_id: Scalars["String"]["input"];
}

export interface AppreciateUpdateInput {
  id: Scalars["String"]["input"];
  text: Scalars["String"]["input"];
}

export const scalarsEnumsHash: ScalarsEnumsHash = {
  Any: true,
  Boolean: true,
  DateTimeISO: true,
  File: true,
  JSON: true,
  JSONObject: true,
  Number: true,
  String: true,
  Void: true,
};
export const generatedSchema = {
  Appreciate: {
    __typename: { __type: "String!" },
    created_at: { __type: "DateTimeISO!" },
    id: { __type: "String!" },
    text: { __type: "String!" },
    updated_at: { __type: "DateTimeISO!" },
    user_id: { __type: "String!" },
  },
  AppreciateInsertInput: {
    text: { __type: "String!" },
    user_id: { __type: "String!" },
  },
  AppreciateUpdateInput: {
    id: { __type: "String!" },
    text: { __type: "String!" },
  },
  mutation: {
    __typename: { __type: "String!" },
    addAppreciate: {
      __type: "Appreciate!",
      __args: { appreciate: "AppreciateInsertInput!" },
    },
    deleteAppreciate: {
      __type: "Boolean!",
      __args: { appreciate_id: "String!" },
    },
    updateAppreciate: {
      __type: "Appreciate!",
      __args: { appreciate: "AppreciateUpdateInput!" },
    },
  },
  query: {
    __typename: { __type: "String!" },
    getAllAppreciates: { __type: "[Appreciate!]!" },
    getById: { __type: "Appreciate!", __args: { apprId: "String!" } },
    getByUserId: { __type: "[Appreciate!]!", __args: { user_id: "String!" } },
    hello: { __type: "String!" },
  },
  subscription: {},
} as const;

export interface Appreciate {
  __typename?: "Appreciate";
  created_at?: Scalars["DateTimeISO"]["output"];
  id?: Scalars["String"]["output"];
  text?: Scalars["String"]["output"];
  updated_at?: Scalars["DateTimeISO"]["output"];
  user_id?: Scalars["String"]["output"];
}

export interface Mutation {
  __typename?: "Mutation";
  addAppreciate: (args: { appreciate: AppreciateInsertInput }) => Appreciate;
  deleteAppreciate: (args: {
    appreciate_id: Scalars["String"]["input"];
  }) => Scalars["Boolean"]["output"];
  updateAppreciate: (args: { appreciate: AppreciateUpdateInput }) => Appreciate;
}

export interface Query {
  __typename?: "Query";
  getAllAppreciates: Array<Appreciate>;
  getById: (args: { apprId: Scalars["String"]["input"] }) => Appreciate;
  getByUserId: (args: {
    user_id: Scalars["String"]["input"];
  }) => Array<Appreciate>;
  hello?: Scalars["String"]["output"];
}

export interface Subscription {
  __typename?: "Subscription";
}

export interface GeneratedSchema {
  query: Query;
  mutation: Mutation;
  subscription: Subscription;
}
