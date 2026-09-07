import { defineRelations } from 'drizzle-orm';
import * as schema from './schema';

export const relations = defineRelations(schema, (r) => ({
    user: {
        sessions: r.many.session(),
        accounts: r.many.account(),
        records: r.many.record()
    },
    session: {
        user: r.one.user({
            from: r.session.userId,
            to: r.user.id,
            optional: false
        })
    },
    account: {
        user: r.one.user({
            from: r.account.userId,
            to: r.user.id,
            optional: false
        })
    },
    record: {
        user: r.one.user({
            from: r.record.userId,
            to: r.user.id,
            optional: false
        }),
        artist: r.one.artist({
            from: r.record.artistId,
            to: r.artist.id,
            optional: false,
        })
    }
}));
