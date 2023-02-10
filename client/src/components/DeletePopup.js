import "./DeletePopup.css"

function DeletePopup (props) {

  //DELETE request for launch
  const deleteLaunch = async (id) => {
    try {

      console.log(id)
      const response = await fetch(`http://localhost:5000/launches/${id}`, {
        method: "DELETE"
      });
      alert('Launch Deleted');

      console.log(response);

    } catch (err) {
      console.log(err.message)
    }

  }

  //If the delete button on the EditLaunch page is clicked, props.trigger === true, revealing this code
  return (props.trigger) ? (
    <div className="delete-popup">
      <div className="popup-inner">
        <p>Are you sure you want to delete this launch?</p>
        <div className="popup-buttons">
          <button className="cancel" type="button" onClick={() => props.setTrigger(false)}>Cancel</button>
          <button className="delete" type="button" onClick={() => deleteLaunch(props.launchId)}>Delete</button>
        </div>
      </div>
    </div>
  ) : "";
}

export default DeletePopup;