import { config } from "@keystone-6/core";
import { lists } from "./schema";

import { withAuth, session } from "./auth";
import { StorageConfig } from "@keystone-6/core/types";

export default withAuth(
    config({
        db: {
            provider: "sqlite",
            url: "file:./keystone.db",
        },
        lists,
        session,
        storage: {
            photos: {
                kind: 'local',
                type: 'image',
                generateUrl: (path: string) => `http://localhost:3000/photo${path}`,
                serverRoute: { path: '/photo' },
                storagePath: 'storage/photos',
            }
        }


    })
);
