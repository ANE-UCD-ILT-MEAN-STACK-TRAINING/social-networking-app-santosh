// (exports.put = multer({ storage: storage }).single("image")),
//   (req, res, next) => {
//     let imagePath = req.body.imagePath;
//     if (req.file) {
//       const url = req.protocol + "://" + req.get("host");
//       imagePath = url + "/images/" + req.file.fieldname;
//     }
//     const post = new Post({
//       _id: req.body.id,
//       title: req.body.title,
//       content: req.body.content,
//       imagePath: imagePath,
//       creator: req.userData.userId,
//     });

//     Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post)
//       .then((result) => {
//         console.log(result);
//         if (result.nModified > 0) {
//           res.status(200).json({ message: "Update successful!" });
//         } else {
//           res.status(401).json({ message: "Not authorized!" });
//         }
//       })
//       .catch((error) => {
//         res.status(500).json({
//           message: "Couldn't udpate post!",
//         });
//       });
//   };
