// import React, { useState } from 'react';

// function CommentBox({ id, detailId, onSubmit }) {
//   const [comment, setComment] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     onSubmit(id, detailId, comment);
//     console.log('form submitted')
//     setComment('');
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Comment:
//         <textarea
//           value={comment}
//           onChange={e => setComment(e.target.value)}
//           required
//         />
//       </label>
//       <button type="submit">Submit</button>
//     </form>
//   );
// }

// export default CommentBox;
