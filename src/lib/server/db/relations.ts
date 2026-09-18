import { defineRelations } from 'drizzle-orm';
import * as schema from './schema';

export const relations = defineRelations(schema, (r) => ({
  user: {
    sessions: r.many.session(),
    accounts: r.many.account(),
    ownerships: r.many.ownership()
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
    artist: r.one.artist({
      from: r.record.artistId,
      to: r.artist.id,
      optional: false,
    })
  },
  ownership: {
    user: r.one.user({
      from: r.ownership.userId,
      to: r.user.id,
      optional: false
    }),
    record: r.one.record({
      from: r.ownership.recordId,
      to: r.record.id,
      optional: false
    })
  }
}));
