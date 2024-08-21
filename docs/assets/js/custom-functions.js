$(document).ready(() => {
  function toggleContent(buttonId, contentId, content) {
    const $button = $(`#${buttonId}`);
    const $contentBox = $(`#${contentId}`);

    // Toggle the active state of the button and content
    $button.toggleClass('active');

    if ($button.hasClass('active')) {
      // Inject content into the content box
      $contentBox.html(content);
    } else {
      // Clear the content if the box is collapsed
      $contentBox.html('');
    }
  }

  $('#certifications').click(() => {
    const content = `
      <p>Here are my certifications:</p>
      <ul>
        <li><a href="https://coursera.org/share/7f609d230950fbc8d21978a5a188ee7f">Introduction to Large Language Models (Google Cloud)</a></li>
        <li><a href="https://coursera.org/share/3c73e571aabc74092b88d71addcb1395">Generative AI with Large Language Models</a></li>
      </ul>`;
    toggleContent('certifications', 'certifications-content', content);
  });

  $('#skills').click(() => {
    const content = `
      <p>Here are my skills:</p>
      <ul>
        <li>Supervised Learning (Naive Bayes, Decision Trees)</li>
        <li>Unsupervised Learning (K-Means Clustering, PCA)</li>
        <li>Convolutional Neural Networks (CNNs)</li>
        <li>Natural Language Processing (NLP)</li>
        <li>Python (NumPy, Pandas, scikit-learn)</li>
        <li>TensorFlow / Keras</li>
        <li>Data Preprocessing & Feature Engineering</li>
        <li>Data Visualization (Matplotlib, Seaborn)</li>
      </ul>`;
    toggleContent('skills', 'skills-content', content);
});


 $('#future-aspirations').click(() => {
    const content = `
      <p>My future aspirations include:</p>
      <p>Diving deeper into AI and machine learning, becoming proficient in deep learning and NLP, and contributing to AI-driven innovations.</p>`;
    toggleContent('future-aspirations', 'future-aspirations-content', content);
});

});
