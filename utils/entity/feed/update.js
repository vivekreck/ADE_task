exports.updateEntity = ({
    CreateError,
    DataValidator,
    logger,
    params = {
        name,
        url,
        desciption
    }
}) => {
    return Object.freeze({
        generate: () => {
            try {
                const validate = DataValidator({ CreateError });

                let entity = {
                    name: null,
                    url: null,
                    desciption: null
                };

                if (params.name) {
                    entity.name = validate.name(params.name).data.value;
                } else {
                    delete entity.name;
                }

                if (params.url) {
                    entity.url = validate.url(params.url).data.value;
                } else {
                    delete entity.url;
                }

                if (params.desciption) {
                    entity.desciption = validate.desciption(params.desciption).data.value;
                } else {
                    delete entity.desciption;
                }

                return {
                    msg: "Success",
                    data: { entity }
                }
            } catch (error) {
                logger.error('Failed to create login entity: %s', error);
                if (error instanceof CreateError) {
                    throw error;
                }
                throw new Error("Unknown error")
            }
        }
    })
}