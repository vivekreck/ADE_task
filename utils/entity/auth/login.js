exports.LoginEntity = ({
    CreateError,
    DataValidator,
    logger,
    params = {
        email,
        password
    }
}) => {
    return Object.freeze({
        generate: () => {
            try {
                const validate = DataValidator({ CreateError });

                let entity = {
                    email: null,
                    password: null,
                };

                if (params.email) {
                    entity.email = validate.email(params.email).data.value;
                } else {
                    throw new CreateError('Email required')
                }

                if (params.password) {
                    const password = params.password;
                    entity.password = validate.password(password).data.value;
                } else {
                    throw new CreateError('Password required')
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