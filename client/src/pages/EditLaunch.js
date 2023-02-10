import { useState } from 'react';
import { useLocation } from 'react-router-dom'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import DeletePopup from '../components/DeletePopup';
import "./EditLaunch.css";

export function EditLaunch () {
  const [deletePopup, setDeletePopup] = useState(false);

  //Gets the launch info from the Link component
  const location = useLocation();
  const { state } = location;

  //Sets the forms values to the existing launch values
  const formik = useFormik({
    initialValues: {
      name: state.launch.name,
      description: state.launch.description,
      launch_types: state.launch.launch_types,
      cliff_launch: state.launch.cliff_launch,
      hiking_time: state.launch.hiking_time,
      city: state.launch.city,
      state: state.launch.state,
      country: state.launch.country,
      latitude: state.launch.latitude,
      longitude: state.launch.longitude,
      wind_limit: state.launch.wind_limit,
      launch_direction: state.launch.launch_direction,
      slope: state.launch.slope,
      elevation_ft: state.launch.elevation_ft,
      elevation_m: state.launch.elevation_m,
      flyable_alt_f: state.launch.flyable_alt_f,
      flyable_alt_m: state.launch.flyable_alt_m      
    },

    //Validation checks
    validationSchema: Yup.object({
      name: Yup.string().max(55, "Name must be 55 characters or less").required("Name is required"),
      description: Yup.string().max(255, "Description must be 255 characters or less"),
      launch_types: Yup.string().max(100, "Launch types must be 100 characters or less"),
      cliff_launch: Yup.boolean(),
      hiking_time: Yup.string().max(55, "Hiking time must be 55 characters or less"),
      city: Yup.string().max(55, "City must be 55 characters or less").required("City is required"),
      state: Yup.string().max(55, "State must be 55 characters or less").required("State is required"),
      country: Yup.string().max(55, "City must be 55 characters or less").required("Country is required"),
      latitude: Yup.number().max(90, "Not valid latitude").min(-90, "Not valid latitude").required("Latitude is required"),
      longitude: Yup.number().max(180, "Not valild longitude").min(-180, "Not valid Longitude").required("Longitude is required"),
      wind_limit: Yup.number().max(50, "Wind limit must be 50 or less").min(0, "Wind must be above 0").required("Wind limit is required"),
      launch_direction: Yup.number().max(359, "Launch direction must be between 0 and 359").min(0, "Launch direction must be between 0 and 359").required("Direction is required"),
      slope: Yup.number().max(90, "Slope must be between 0 and 90").min(0, "Slope must be between 0 and 90"),
      elevation_ft: Yup.number().max(30000, "Elevation must be 30,000ft or less"),
      elevation_m: Yup.number().max(20000, "Elevation must be 20,000m or less"),
      flyable_alt_f: Yup.number().max(30000, "Flyable altitude must be 30,000ft or less"),
      flyable_alt_m: Yup.number().max(20000, "Flyable altitude must be 20,000m or less")
    }),

    //On submit PUT to the database
    onSubmit: async (values) => {
      try {
        const response = await fetch(`http://localhost:5000/launches/${state.launch.id}`,{
          method: "PUT",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(values)
        })
        alert("Launch was Edited!")
        
        console.log(response);
      } catch(err) {
        console.log(err.message);
      }
    }
  });

  console.log(formik.errors);

  return <div className="edit-launch-page">
          <h1>Edit {state.launch.name}</h1>
          <form onSubmit={formik.handleSubmit} className="submission-form">
            <div className="form-left">
              <div className="name-input">
                <label htmlFor="name">{formik.touched.name && formik.errors.name ? formik.errors.name : "Name:*"}</label>
                <input type="text" name="name" placeholder="Enter Launch Name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
              </div>
              <div className="description-input">
                <label htmlFor="description">{formik.touched.description && formik.errors.description ? formik.errors.description : "Description:"}</label>
                <textarea name="description" placeholder="Tell us about it" value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur}></textarea>
              </div>
              <div className="launch-type-input">
                <label htmlFor="launch_types">{formik.touched.launch_types && formik.errors.launch_types ? formik.errors.launch_types : "Launch Types:"}</label>
                <input type="text" name="launch_types" placeholder="Who can use it?" value={formik.values.launch_types} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
              </div>
              <div className="cliff-input">
                <label htmlFor="cliff_launch">{formik.touched.cliff_launch && formik.errors.cliff_launch ? formik.errors.cliff_launch : "Cliff Launch:"}</label>
                <input type="checkbox" name="cliff_launch" placeholder="Is this a cliff launch?" value={formik.values.cliff_launch} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
              </div>
              <div className="hike-time-input">
                <label htmlFor="hiking_time">{formik.touched.hiking_time && formik.errors.hiking_time ? formik.errors.hiking_time : "Hiking Time:"}</label>
                <input type="text" name="hiking_time" placeholder="How long to hike?" value={formik.values.hiking_time} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
              </div>
              <div className="city-input">
                <label htmlFor="city">{formik.touched.city && formik.errors.city ? formik.errors.city : "City:*"}</label>
                <input type="text" name="city" placeholder="What city is it close to?" value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
              </div>
              <div className="state-input">
                <label htmlFor="state">{formik.touched.state && formik.errors.state ? formik.errors.state : "State:*"}</label>
                <input type="text" name="state" placeholder="What state is it in?" value={formik.values.state} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
              </div>
              <div className="country-input">
                <label htmlFor="country">{formik.touched.country && formik.errors.country ? formik.errors.country : "Country:*"}</label>
                <input type="text" name="country" placeholder="What country is it in?" value={formik.values.country} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
              </div>
              <div className="button-cont">
                <button className="submit-button" type="submit">Submit Launch</button>
                <button className="delete-button" type="button" onClick={()=> setDeletePopup(true)}>Delete Launch</button>
              </div>
            </div>
            <div className="form-right">
              <div className="latitude-input">
                <label htmlFor="latitude">{formik.touched.latitude && formik.errors.latitude ? formik.errors.latitude : "Latitude:*"}</label>
                <input type="number" name="latitude" placeholder="What is the latitude?" value={formik.values.latitude} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
              </div>
              <div className="longitude-input">
                <label htmlFor="longitude">{formik.touched.longitude && formik.errors.longitude ? formik.errors.longitude : "Longitude:*"}</label>
                <input type="number" name="longitude" placeholder="What is the longitude?" value={formik.values.longitude} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
              </div>
              <div className="wind-limit-input">
                <label htmlFor="wind_limit">{formik.touched.wind_limit && formik.errors.wind_limit ? formik.errors.wind_limit : "Wind Limit:*"}</label>
                <input type="number" name="wind_limit" placeholder="Max winds?" value={formik.values.wind_limit} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
              </div>
              <div className="launch-direction-input">
                <label htmlFor="launch_direction">{formik.touched.launch_direction && formik.errors.launch_direction ? formik.errors.launch_direction : "Launch Direction(degrees):*"}</label>
                <input type="number" name="launch_direction" placeholder="What direction does it face?" value={formik.values.launch_direction} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
              </div>
              <div className="slope-input">
                <label htmlFor="slope">{formik.touched.slope && formik.errors.slope ? formik.errors.slope : "Slope(%):"}</label>
                <input type="number" name="slope" placeholder="How steep (%)?" value={formik.values.slope} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
              </div>
              <div className="elevation-ft-input">
                <label htmlFor="elevation_ft">{formik.touched.elevation_ft && formik.errors.elevation_ft ? formik.errors.elevation_ft : "Elevation in Feet:"}</label>
                <input type="number" name="elevation_ft" placeholder="Elevation(ft)?" value={formik.values.elevation_ft} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
              </div>
              <div className="elevation-m-input">
                <label htmlFor="elevation_m">{formik.touched.elevation_m && formik.errors.elevation_m ? formik.errors.elevation_m : "Elevation in Meters"}</label>
                <input type="number" name="elevation_m" placeholder="Elevation(m)?" value={formik.values.elevation_m} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
              </div>
              <div className="flyable-ft-input">
                <label htmlFor="flyable_alt_f">{formik.touched.flyable_alt_f && formik.errors.flyable_alt_f ? formik.errors.flyable_alt_f : "Flyable Altitude in Feet"}</label>
                <input type="number" name="flyable_alt_f" placeholder="Flyable alt(ft)" value={formik.values.flyable_alt_f} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
              </div>
              <div className="flyable-m-input">
                <label htmlFor="flyable_alt_m">{formik.touched.flyable_alt_m && formik.errors.flyable_alt_m ? formik.errors.flyable_alt_m : "Flyable Altitude in Meters"}</label>
                <input type="number" name="flyable_alt_m" placeholder="Flyable alt(m)" value={formik.values.flyable_alt_m} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
              </div>
            </div>
          </form>
          <DeletePopup trigger={deletePopup} setTrigger={setDeletePopup} launchId={state.launch.id}/>
        </div>
}

