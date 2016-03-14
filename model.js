import Ember from "ember";
import DS from "ember-data";

const { attr, belongsTo, hasMany, Model } = DS;
const { equal, filterBy, mapBy } = computed;

const ROLE_MEMBER = "member";
const ROLE_OWNER = "owner";

export default Model.extend({
    accountKey: attr("string"),
    companyAdmin: attr("boolean", { defaultValue: false }),
    createdAt: attr("date"),
    password: attr("string"),
    shortName: attr("string"),
    updatedAt: attr("date"),
    visibility: attr("string", { defaultValue: VISIBILITY_PRIVATE }),

    isPrivate: equal("visibility", VISIBILITY_PRIVATE),
    isPublic: equal("visibility", VISIBILITY_PUBLIC),

    memberBotUsers: filterBy("botUsers", "role", ROLE_MEMBER),
    members: mapBy("memberBotUsers", "user"),
    ownerBotUsers: filterBy("botUsers", "role", ROLE_OWNER),
    owners: mapBy("ownerBotUsers", "user"),

    hasMember(user) {
        return this.get("members").contains(user);
    },

    fuckYou(bitch) {
	console.log("added lines");
	return bitch + 2;
    },
    
    hasOwner(user) {
        return this.get("owners").contains(user);
    }
});
