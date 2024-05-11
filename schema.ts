import { list } from "@keystone-6/core";
import { text, password, timestamp, image } from "@keystone-6/core/fields";
import type { Lists } from ".keystone/types";

type Session = {
    data: {
        name: string;
    }
}

const loggedIn = ({ session }: { session?: Session }) => Boolean(session)

const generalAccess = {
    operation: {
        query: loggedIn,
        create: loggedIn,
        update: loggedIn,
        delete: loggedIn
    }
}

export const lists: Lists = {
    User: list({
        access: generalAccess,
        fields: {
            name: text({ validation: { isRequired: true } }),
            email: text({
                validation: { isRequired: true },
                isIndexed: "unique",
            }),
            password: password({ validation: { isRequired: true } }),
            createdAt: timestamp({
                defaultValue: { kind: "now" },
            }),
        },
    }),
    Photo: list({
        access: generalAccess,
        fields: {
            image: image({storage: 'photos'})
        }
    })
};
