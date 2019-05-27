import React from 'react'

const MobileAbout = () => {
    return (
        <div className={'mobileAboutComp'}>
        <section className='quickInfo'>
          <h1>SOME QUICK INFO</h1>
            <p>
              you can avoid getting bottlenecked by my shitty ALDI server if you click on advanced and save the preferred format directly.
            </p>
            <p>
              picking the format "BEST AUDIO" or "SMALLEST AUDIO" will convert the video to mp3 before sending it to you.<br/>
              Youtube prevents fast audio only downloads so it might be slower than downloading the video and converting it by yourself
            </p>
        </section>
        <section>
          <h1>CONTACT</h1>
            <p>
              feel free to contact me on <a href="mailto:baizonpc@gmail.com">baizonpc@gmail.com</a> if you find a bug or have any suggestions!
            </p>
        </section>
        <section>
          <h1>SCHEKELS</h1>
            <p>
              wanna drop some Schekels to upgrade servers to LIDL level?
            </p>
            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
              <input type="hidden" name="cmd" value="_s-xclick" />
              <input type="hidden" name="hosted_button_id" value="22T8XSMYF8RMJ" />
              <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
              <img alt="" border="0" src="https://www.paypal.com/en_DE/i/scr/pixel.gif" width="1" height="1" />
            </form>
        </section>
      
    </div>
    )
}

export default MobileAbout
