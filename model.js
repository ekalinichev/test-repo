import Ember from "ember";
import DS from "ember-data";

const { attr, belongsTo, hasMany, Model } = DS;
const { computed } = Ember;
const { equal, filterBy, mapBy } = computed;

const ROLE_MEMBER = "member";
const ROLE_OWNER = "owner";
const VISIBILITY_PRIVATE = "private";
const VISIBILITY_PUBLIC = "public";

export default Model.extend({
    accountKey: attr("string"),
    companyAdmin: attr("boolean", { defaultValue: false }),
    createdAt: attr("date"),
    password: attr("string"),
    shortName: attr("string"),
    updatedAt: attr("date"),
    visibility: attr("string", { defaultValue: VISIBILITY_PRIVATE }),

    botUsers: hasMany("bot-user", { async: false }),
    company: belongsTo("company", { async: false }),
    creator: belongsTo("user", { async: false }),
    sshKeys: hasMany("ssh-key", { async: false }),

    isPrivate: equal("visibility", VISIBILITY_PRIVATE),
    isPublic: equal("visibility", VISIBILITY_PUBLIC),

    memberBotUsers: filterBy("botUsers", "role", ROLE_MEMBER),
    members: mapBy("memberBotUsers", "user"),
    ownerBotUsers: filterBy("botUsers", "role", ROLE_OWNER),
    owners: mapBy("ownerBotUsers", "user"),

    hasMember(user) {
        return this.get("members").contains(user);
    },

    hasOwner(user) {
        return this.get("owners").contains(user);
    }
});
