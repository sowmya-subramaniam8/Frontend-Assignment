# Frontend-Assignment

## Instructions
1. Please write the answer to the questions 1 and 2 in a word document. 
2. Commit and push the React App and the word document to a new branch with your name.


### Question number 1

What are microtasks? What is a microtask queue? What is their role in Promises and how are they different from callbacks?

### Question number 2

Explain with examples how private, protected variables can be implemented in classes and how can they be used in subclasses?

### Create a dynamic form in React:

We store a lot of form data in our databases. A frequent task would be to fetch the form data, render it, validate it and modify any changes. The following is a basic implementation of such a function:
Feel free to use any boilerplate (like CRA) or UI framework (like Material UI) you want.

We care about code that is readable (even without comments), non-repeating (within reason) and structured well.
Avoid third party libraries for form handling (like react-form, simple-react-form etc). 

1. Should take an array of objects as an input. Use the following as an example (but feel free to change the field names or add/remove fields).

    ```jsx
    const formItems = [
    	{
    		id: 1,
    		type: "string",
    		required: true,
    		field: "name",
    		value: "Waterlabs"
    	},
    	{
    		id: 2,
    		type: "number",
    		required: true,
    		field: "age",
    		value: 1
    	},
    	...
    ]
    ```

2. Each field must have validations:
- Required / Not Required
- Number, String and Email
- Min/Max length
3. Show validation errors with a red colour indication.
4. Put in a reset button and a submit button.
5. On submit, any errors should be displayed at the bottom of appropriate field.
6. If successful, update the form object.
7. Bonus: If you can implement this with the form data fetched and updated using MobX, context API or Redux.
