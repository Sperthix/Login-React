import React, { useState, useRef } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import styles from "./AddUser.module.css";
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const [error, setError] = useState();

  const addUserHandler = (e) => {
    e.preventDefault();
    const enteredUName = nameInputRef.current.value;
    const enteredUAge = ageInputRef.current.value;
    if (enteredUAge > 0 && enteredUName.trim().length > 0) {
      props.onAddUser(enteredUName, enteredUAge);
      setError(null);
      nameInputRef.current.value = '';
      ageInputRef.current.value = '';
    } else if (enteredUAge <= 0) {
      setError({
        title: "Invalid age",
        message: "You have entered invalid age, unless you are non existing",
      });
    } else if (enteredUName.trim().length <= 0) {
      setError({
        title: "Invalid username",
        message: "Please enter your Username",
      });
    } else return;
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={styles.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" ref={nameInputRef} />
          <label htmlFor="age">Age (Years)</label>
          <input id="age" type="number" ref={ageInputRef} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
