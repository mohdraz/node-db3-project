const db = require("../data/db-config");

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
};

function find() {
  return db("schemes");
}

function findById(id) {
  return db("schemes")
    .where("id", id)
    .first();
}

function findSteps(id) {
  return (
    db("steps as st")
      .join("schemes as s", "s.id", "st.scheme_id")
      .select("st.id", "s.scheme_name", "st.step_number", "st.instructions")
      // .where({ scheme_id: id });
      //.where("scheme_id", id)
      .where("st.scheme_id", id)
  );
}

function add(newScheme) {
  return db("schemes").insert(newScheme);
}

function update(changes, id) {
  return db("schemes")
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db("schemes")
    .where({ id })
    .del();
}

function addStep(step, scheme_id) {
  return db("steps as st")
    .join("schemes as s", "s.id", "st.scheme_id")
    .insert();
}
