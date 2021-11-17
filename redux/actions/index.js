export const signOut = () => {
    return {
        type: "SIGN_OUT"
    };
};

export const signIn = () => {
    return {
        type: "SIGN_IN"
    };
};

export const deskPush = (object) => {
    return {
        type: "PUSH",
        item:object
    };
};

export const deskEdit = (object, id) => {
    return {
        type: "EDIT",
        index:id,
        item:object
    };
};

export const deskSplice = (x) => {
    return {
        type: "SPLICE",
        index:x,
    };
};


export const deskClean = () => {
    return {
        type: "CLEAN",
    };
};
