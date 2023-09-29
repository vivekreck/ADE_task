exports.PermissionEntity = ({
    CreateError,
    DataValidator,
    logger,
    params = {
        feed,
        admin,
        basic
    }
}) => {
    return Object.freeze({
        generate: () => {
            try {
                const validate = DataValidator({ CreateError });

                let entity = {
                    feed: null,
                    admin: null,
                    basic: null,
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

                if (params?.basic && typeof params.basic == 'object') {
                    entity.basic = [{
                        edit: params.basic[0].edit || "",
                        delete: params.basic[0].delete || "",
                        read: params.basic[0].read || "",
                        create: params.basic[0].create || ""
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