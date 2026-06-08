export type GetAllResponse = {
  getAllAppreciates: Array<{
    id: string;
    user_id: string;
    text: string;
    created_at: string;
    updated_at: string;
  }>;
};

export type GetByUserIdResponse = {
  getByUserId: Array<{
    id: string;
    user_id: string;
    text: string;
    created_at: string;
    updated_at: string;
  }>;
};

export type GetByIdResponse = {
  getById: {
    id: string;
    user_id: string;
    text: string;
    created_at: string;
    updated_at: string;
  };
};

export type UpdateByIdResponse = {
  updateAppreciate: {
    id: string;
    user_id: string;
    text: string;
    created_at: string;
    updated_at: string;
  };
};

export type addApprResponse = {
  addAppreciate: {
    id: string;
    user_id: string;
    text: string;
    created_at: string;
    updated_at: string;
  };
};


export interface UpdateAppreciateInput {
    user_id: string;
    text: string;
}
