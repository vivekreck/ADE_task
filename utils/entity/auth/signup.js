exports.SignupEntity = ({
    CreateError,
    DataValidator,
    logger,
    params = {
        name,
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
                    name: null
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

                if (params.name) {
                    entity.name = validate.name(params.name).data.value;
                } else {
                    throw new CreateError("Name required")
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