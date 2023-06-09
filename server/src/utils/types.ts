// Creating a custom type
// The reason for using a custom type (instead of the dto) is because sometimes the user might send
// additional properties that are needed on the server but that are not saved in the database,
// for example password and confirm password fields in a signup form (only password would be passed
// into the service and saved to the database). In this case, the custom type contains the finalized
// data to be sent to the database
export type CreateUserParams = {
    username: string;
    email: string;
    password: string;
};

export type Create42UserParams = {
    idFortyTwo: number;
    username: string;
    email: string;
    authStrategy: string;
    avatar: string;
};

export type UpdateUserParams = {
    username?: string;
    email?: string;
    password?: string;
    enable2FA?: boolean;
    code2FA?: string;
    avatar?: string;
};

export type Update42UserParams = {
    username?: string;
    email?: string;
    enable2FA?: boolean;
    code2Fa?: string;
    avatar?: string;
};

export type CreateMessageParams = {
    userId: number;
    content: string;
    channelId: number;
};

export type ModifyMessageParams = {
    content: string;
    id: number;
};
