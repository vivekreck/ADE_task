exports.PermissionEntity = ({
    CreateError,
    DataValidator,
    logger,
    params = {
        feed,
        admin,
        user
    }
}) => {
    return Object.freeze({
        generate: () => {
            try {
                const validate = DataValidator({ CreateError });

                let entity = {
                    feed: null,
                    admin: null,
                    user: null,
                };

                if (params?.feed && typeof params.feed == 'object') {
                    entity.feed = [{
                        edit: params.feed[0].edit || "",
                        delete: params.feed[0].delete || "",
                        read: params.feed[0].read || "",
                        create: params.feed[0].create || ""
                    }];
                }

                if (params?.admin && typeof params.admin == 'object') {
                    entity.admin = [{
                        edit: params.admin[0].edit || "",
                        delete: params.admin[0].delete || "",
                        read: params.admin[0].read || "",
                        create: params.admin[0].create || ""
                    }];
                }

                if (params?.user && typeof params.user == 'object') {
                    entity.user = [{
                        edit: params.user[0].edit || "",
                        delete: params.user[0].delete || "",
                        read: params.user[0].read || "",
                        create: params.user[0].create || ""
                    }];
                }

                return {
                    msg: "Success",
                    data: { entity }
                }
            } catch (error) {
                logger.error('Failed to create signup entity: %s', error);
                if (error instanceof CreateError) {
                    throw error;
                }
                throw new Error("Unknown error")
            }
        }
    })
}